import express from "express";
import { MongoClient, ObjectID } from "mongodb";
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
            _id: 1,
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
            contests[contest._id] = contest;
        });
});

router.get("/contests/:contestId", (req, res) => {
    db.collection("contests").findOne({ _id: ObjectID(req.params.contestId) })
        .then(contest => res.send(contest))
        .catch(console.error);
});

router.get("/names/:nameIds", (req, res) => {
    const nameIds = req.params.nameIds.split(",").map(ObjectID); // Converts to array of numbers [101, 102...]
    let names = {};
    db.collection("names").find({ _id: { $in: nameIds } }) // Find all the names for all the ids that are passed to the API
        .each((err, name) => { // Cursor jumps to each document found
            assert.equal(null, err);
            if (!name) { // No more names to process
                res.send({ names });
                return;
            }
            names[name._id] = name;
        });
});

router.post("/names", (req, res) => {
    const contestId = ObjectID(req.body.contestId);
    const name = req.body.newName;
    // Validation
    db.collection("names").insertOne({ name })
        .then(result => {
            db.collection("contests").findOneAndUpdate(
                { _id: contestId },
                { $push: { nameIds: result.insertedId } },
                { returnOriginal: false } // Ensures the updated document is returned
            )
                .then(doc => {
                    res.send({
                        updatedContest: doc.value,
                        newName: {
                            _id: result.insertedId,
                            name
                        }
                    });
                })
                .catch(err => {
                    console.error(err);
                    res.status(404).send("Bad Request");
                });
        })
        .catch(err => {
            console.error(err);
            res.status(404).send("Bad Request");
        });
});

export default router;