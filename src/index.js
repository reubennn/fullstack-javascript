import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const Header = ({ message }) => {
    return (
        <h1 className="Header text-center">
            {message} -- {Math.random()}
        </h1>
    );
};

// Define prop types
Header.propTypes = {
    message: PropTypes.string
};

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

ReactDOM.render(
    <App />,
    document.getElementById("root")
);