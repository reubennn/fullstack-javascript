import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ContestPreview extends Component {
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        contestName: PropTypes.string.isRequired
    }

    handleClick = () => {
        console.log(this.props.contestName);
    };
    render() {
        return (
            <div className="link ContestPreview" onClick={this.handleClick}>
                <div className="category-name">
                    {this.props.categoryName}
                </div>
                <div className="contest-name">
                    {this.props.contestName}
                </div>
            </div>
        );
    }
}