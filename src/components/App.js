import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import ContestList from "./ContestList";
import Contest from "./Contest";
import * as api from "../api";

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

        api.fetchContest(contestId)
            .then(contest => {
                this.setState({
                    pageHeader: contest.contestName,
                    currentContestId: contest.id,
                    contests: {
                        ...this.state.contests, // Copy the current contests state
                        [contest.id]: contest // Property associated with current contest id => set to new contest from server
                    }
                });
            });
    };

    currentContent() {
        if (this.state.currentContestId) {
            return <Contest {...this.state.contests[this.state.currentContestId]} />;
        }
        return <ContestList
            onContestClick={this.fetchContest}
            contests={this.state.contests} />;
    }

    render() {
        return (
            <div className="App">
                <Header message={this.state.pageHeader} />
                {this.currentContent()}
            </div>
        ); // {...this.props} = spread notation
    }
}

App.propTypes = {
    initialContests: PropTypes.object
};

export default App;