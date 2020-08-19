import React from "react";
import Header from "./Header";

const App = () => {
    return (
        <div className="App">
            <Header message="Name Contests" />
            <p className="text-center">
                ...
            </p>
        </div>
    );
};

// Define default prop values
App.defaultProps = {
    headerMessage: "Hello!!"
};

export default App;