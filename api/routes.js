import express from "express";
import { MongoClient } from "mongodb";
import assert from "assert";
import config from "../config/config";

let db;

MongoClient.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err); // Checks if err === null, if it doesn't (error occurred), it will throw an error

    console.log(`Connected successfully to the Mongo server on ${config.mongodbUri}\n`);
    db = client.db("fullstack");
    db.collection("contests");
});

const router = express.Router();


router.get("/contests", (req, res) => {
    let contests = {};
    db.collection("contests").find({})
        .project({ // Only get the relevant data
            _id: 0,
            id: 1,
            categoryName: 1,
            contestName: 1,
            description: 1
        })
        .each((err, contest) => { // Cursor jumps to each document found
            assert.equal(null, err);
            if (!contest) { // No more contests to process
                res.send({ contests });
                return;
            }
            contests[contest.id] = contest;
        });
});

router.get("/contests/:contestId", (req, res) => {
    db.collection("contests").findOne({ id: Number(req.params.contestId) })
        .then(contest => res.send(contest))
        .catch(console.error);
});

router.get("/names/:nameIds", (req, res) => {
    const nameIds = req.params.nameIds.split(",").map(Number); // Converts to array of numbers [101, 102...]
    let names = {};
    db.collection("names").find({id: {$in: nameIds}}) // Find all the names for all the ids that are passed to the API
        .each((err, name) => { // Cursor jumps to each document found
            assert.equal(null, err);
            if (!name) { // No more names to process
                res.send({ names });
                return;
            }
            names[name.id] = name;
        });
});

export default router;