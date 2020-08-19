const path = require("path");
const webpack = require("webpack");

module.exports = {
    mode: "development",
    entry: [
        "webpack-hot-middleware/client",
        "./src/index.js"
    ],
    output: {
        path: path.join(__dirname, "/public"),
        filename: "bundle.js",
        publicPath: "/"
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
        contentBase: path.join(__dirname, "/public"),
        compress: true,
        port: 9000,
        inline: true,
        hot: true,
        watchContentBase: true,
        watchOptions: {
            poll: true
        },
        proxy: {
            "^/api/*": {
                target: "http://localhost:4000",
                secure: false
            },
        },
    }
};
