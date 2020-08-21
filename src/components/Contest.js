import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Contest extends Component {
    static propTypes = {
        description: PropTypes.string.isRequired,
        contestListClick: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="Contest">
                <div className="contest-description">
                    {this.props.description}
                </div>
                <div className="home-link link"
                    onClick={this.props.contestListClick}>
                    Contest List
                </div>
            </div>
        );
    }
}
