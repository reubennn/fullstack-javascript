import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import ContestPreview from "./ContestPreview";

// Use class ___ extends React.Component if we need to introduce state
// Or if lifecycle methods are required
class App extends React.Component {
    state = {
        pageHeader: "Naming Contests",
        contests: this.props.initialContests
    };
    render() {
        return (
            <div className="App">
                <Header message={this.state.pageHeader} />
                <div className="text-center">
                    {this.state.contests.map(contest =>
                        <ContestPreview key={contest.id} {...contest} />
                    )}
                </div>
            </div>
        ); // {...this.props} = spread notation
    }
}

App.propTypes = {
    initialContests: PropTypes.array
};

export default App;