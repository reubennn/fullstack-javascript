import React from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";

import App from "../src/components/App";
import config from "../config/config";

const getApiUrl = (contestId) => {
    if (contestId) { // Fetch all of the data for a specific contest
        return `${config.serverUrl}/api/contests/${contestId}`;
    }
    return `${config.serverUrl}/api/contests`; // Fetch core data for all contests
};

const getInitialData = (contestId, apiData) => {
    if (contestId) {
        return {
            currentContestId: apiData.id,
            contests: {
                [apiData.id]: apiData
            }
        };
    }
    return {
        contests: apiData.contests
    };
};

// Fetch the data from the API
// serverRender returns a promise
const serverRender = (contestId) =>
    axios.get(getApiUrl(contestId))
        .then(res => {
            const initialData = getInitialData(contestId, res.data);
            return {
                initialMarkup: ReactDOMServer.renderToString(
                    <App initialData={initialData} />
                ),
                initialData: initialData
            };
        }).catch(err => {
            console.log(err);
        });

export default serverRender;