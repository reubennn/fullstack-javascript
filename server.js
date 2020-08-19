import config from "./config";
import apiRouter from "./api/routes";
import express from "express";

// Webpack middleware Node.js packages
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

const app = express();

// Set EJS as the template engine
app.set("view engine", "ejs");

// Render index.ejs
app.get("/", (req, res) => {
    res.render("index", {
        content: "Hello Express and <em>EJS</em>!"
    });
});

// ---------- Middleware ---------- //
if (config.nodeEnv == "DEV") {
    console.log(`
~~~~~~~ DEVELOPMENT MODE ~~~~~~~
    `);
    // Required for webpack-dev- and webpack-hot- middleware

    // Set up the compiler webpack.config.js configuration
    const webpackConfig = require("./webpack.config.js");
    const compiler = webpack(webpackConfig);

    // Set up webpack-dev-middleware & webpack-hot-middleware
    // with the webpack.config.js configuration file as a base.
    const devMiddleware = webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        logLevel: "warn"
        // stats: "minimal"
    });

    const hotMiddleware = webpackHotMiddleware(compiler);

    // Tell express to use the webpack middleware
    app.use(devMiddleware);
    app.use(hotMiddleware);
} else {
    app.use(express.static("public"));
}

app.use("/api", apiRouter);
// app.use(express.static("public"));

app.listen(config.PORT, () => {
    config.cLog(`
Express server is listening on https://localhost:${config.PORT}.
    `);
});