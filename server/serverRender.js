// Fetch the data from the API

import config from "../config/config";
import axios from "axios";

axios.get(`${config.serverUrl}/api/contests`)
    .then(res => {
        console.log(res.data);
    }).catch(err => {
        console.log(err);
    });