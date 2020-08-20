import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import ContestList from "./ContestList";

const pushState = (obj, url) => {
    window.history.pushState(obj, "", url);
};

// Use class ___ extends React.Component if we need to introduce state
// Or if lifecycle methods are required
class App extends React.Component {
    state = {
        pageHeader: "Naming Contests",
        contests: this.props.initialContests
    };

    fetchContest = (contestId) => {
        pushState(
            { currentContestId: contestId },
            `/contest/${contestId}`
        );
    }

    render() {
        return (
            <div className="App">
                <Header message={this.state.pageHeader} />
                <ContestList
                    onContestClick={this.fetchContest}
                    contests={this.state.contests} />
            </div>
        ); // {...this.props} = spread notation
    }
}

App.propTypes = {
    initialContests: PropTypes.array
};

export default App;