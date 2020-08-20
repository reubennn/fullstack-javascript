import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ContestPreview extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        categoryName: PropTypes.string.isRequired,
        contestName: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    }

    handleClick = () => {
        this.props.onClick(this.props.id);
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