import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Contest extends Component {
    static propTypes = {
        description: PropTypes.string.isRequired,
        contestListClick: PropTypes.func.isRequired,
        fetchNames: PropTypes.func.isRequired,
        nameIds: PropTypes.array.isRequired,
        lookupName: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.fetchNames(this.props.nameIds);
    }

    render() {
        return (
            <div className="Contest">
                <div className="card card-default">
                    <div className="card-header bg-dark">
                        <h3 className="card-title">Contest Description</h3>
                    </div>
                    <div className="card-body">
                        <div className="contest-description">
                            {this.props.description}
                        </div>
                    </div>
                </div>

                <div className="card card-default">
                    <div className="card-header bg-dark">
                        <h3 className="card-title">Proposed Names</h3>
                    </div>
                    <div className="card-body">
                        <ul className="list-group">
                            {this.props.nameIds.map(nameId =>
                                <li className="list-group-item"
                                    key={nameId} >
                                    {this.props.lookupName(nameId).name}
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className="card card-info">
                    <div className="card-header bg-dark">
                        <h3 className="card-title">Propose a New Name</h3>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group">
                                <input type="text" placeholder="New Name Here..." className="form-control" />
                                <span className="input-group-btn">
                                    <button type="submit" className="btn btn-info">Submit</button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>

                <button className="btn btn-primary"
                    onClick={this.props.contestListClick}>
                    Contest List
                </button>
            </div >
        );
    }
}