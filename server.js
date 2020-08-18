import config from "./config";
import apiRouter from "./api/routes";

import express from "express";
const server = express();

server.set("view engine", "ejs");

server.get("/", (req, res) => {
    res.render("index", {
        content: "Hello Express and <em>EJS</em>!"
    });
});

// Middleware
server.use("/api", apiRouter);
server.use(express.static("public"));

server.listen(config.port, () => {
    console.info(`Express server is listening on https://localhost:${config.port}.`);
});