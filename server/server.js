import config from "../config/config";
import apiRouter from "../api/routes";
import express from "express";
import sassMiddleware from "node-sass-middleware";
import path from "path";
import "./serverRender";

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
        content: "..."
    });
});

// ---------- Middleware ---------- //
if (config.NODE_ENV == "DEV") {
    console.log("\n~~~~~~~ DEVELOPMENT MODE ~~~~~~~\n");
    // Required for webpack-dev- and webpack-hot- middleware

    // Set up the compiler webpack.config.js configuration
    const webpackConfig = require("../config/webpack.config.js");
    const compiler = webpack(webpackConfig);

    // Set up webpack-dev-middleware & webpack-hot-middleware
    // with the webpack.config.js configuration file as a base.
    const devMiddleware = webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        logLevel: "warn",
        writeToDisk: true
        // stats: "minimal"
    });

    const hotMiddleware = webpackHotMiddleware(compiler);

    // Tell express to use the webpack middleware
    app.use(devMiddleware);
    app.use(hotMiddleware);
}

app.use("/api", apiRouter);

// Compile sass/styles.sass into public/styles.css
app.use(sassMiddleware({
    src: path.join(__dirname, "sass"),
    dest: path.join(__dirname, "public")
}));

// Serve all static files in public/
app.use(express.static("public"));

app.listen(config.PORT, config.HOST, () => {
    console.log(`~ Express server is listening on https://localhost:${config.PORT}.\n`);
});