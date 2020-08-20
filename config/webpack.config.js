const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: [
        "webpack-hot-middleware/client",
        path.join(__dirname, "../src/index.js")
    ],
    output: {
        publicPath: path.join(__dirname, "../public"), // For public image, css etc
        path: path.join(__dirname, "../public"), // Location of js build bundle
        filename: "bundle.js",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    devServer: {
        contentBase: path.join(__dirname, "../public"),
        compress: true,
        port: 9000,
        inline: true,
        hot: true,
        watchContentBase: true,
        watchOptions: {
            poll: true
        },
        proxy: {
            "/api/*": {
                target: "http://localhost:4000",
                secure: false
            },
        },
    }
};
