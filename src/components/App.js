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
    static propTypes = {
        initialData: PropTypes.object.isRequired
    };

    state = this.props.initialData;

    fetchContest = (contestId) => {
        pushState(
            { currentContestId: contestId },
            `/contest/${contestId}`
        );

        api.fetchContest(contestId)
            .then(contest => {
                this.setState({
                    currentContestId: contest.id,
                    contests: {
                        ...this.state.contests, // Copy the current contests state
                        [contest.id]: contest // Property associated with current contest id => set to new contest from server
                    }
                });
            });
    };
    currentContest() {
        return this.state.contests[this.state.currentContestId];
    }

    pageHeader() {
        if (this.state.currentContestId) {
            return this.currentContest().contestName;
        }
        return "Naming Contests";
    }

    currentContent() {
        if (this.state.currentContestId) {
            return <Contest {...this.currentContest()} />;
        }
        return <ContestList
            onContestClick={this.fetchContest}
            contests={this.state.contests} />;
    }

    render() {
        return (
            <div className="App">
                <Header message={this.pageHeader()} />
                {this.currentContent()}
            </div>
        ); // {...this.props} = spread notation
    }
}

export default App;