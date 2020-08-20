import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

/*
** If markup exists from server-side rendering,
** then we need to hydrate() instead of render()
*/
let isMarkupPresent = document.getElementById("root").hasChildNodes();

isMarkupPresent ? ReactDOM.hydrate(
    <App initialContests={window.data.contests} />,
    document.getElementById("root")
)
    : ReactDOM.render(
        <App initialContests={window.data.contests} />,
        document.getElementById("root")
    );