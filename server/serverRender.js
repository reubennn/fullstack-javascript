import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";

import App from "../src/components/App";
import config from "../config/config";

// Fetch the data from the API
// serverRender returns a promise
const serverRender = () =>
    axios.get(`${config.serverUrl}/api/contests`)
        .then(res => {
            return {
                initialMarkup: ReactDOMServer.renderToString(
                    <App initialData={res.data} />
                ),
                initialData: res.data
            };
        }).catch(err => {
            console.log(err);
        });

export default serverRender;