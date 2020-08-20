import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Contest extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired
    }

    render() {
        return (
            <div className="Contest">
                {this.props.id}
            </div>
        );
    }
}
