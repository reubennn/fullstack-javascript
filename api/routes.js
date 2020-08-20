import express from "express";
import data from "../src/testData";

const router = express.Router();
const contests = data.contests.reduce((obj, contest) => {
    obj[contest.id] = contest;
    return obj;
}, {}); // reduce.(callback(accumulator, currentValue)..., initial value)

router.get("/contests", (req, res) => {
    res.send({
        contests: contests
    });
});

router.get("/contests/:contestId", (req, res) => {
    // contestId is dynamic => accessible by req.params.contestId
    let contest = contests[req.params.contestId];
    contest.description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident consequatur eos in ad ratione corrupti. Distinctio harum quisquam repellat, esse rerum et tenetur illo repellendus voluptate aliquid nisi corporis neque!";
    res.send(contest);
});

export default router;