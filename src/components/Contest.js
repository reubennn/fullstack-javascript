import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Contest extends Component {
    static propTypes = {
        description: PropTypes.string.isRequired
    }

    render() {
        return (
            <div className="Contest">
                {this.props.description}
            </div>
        );
    }
}
