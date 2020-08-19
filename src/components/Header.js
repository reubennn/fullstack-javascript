import React from "react";
import PropTypes from "prop-types";

// Stateless function component syntax
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

export default Header;