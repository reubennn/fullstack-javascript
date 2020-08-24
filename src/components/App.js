import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import ContestList from "./ContestList";
import Contest from "./Contest";
import * as api from "../api";

const pushState = (obj, url) => {
    window.history.pushState(obj, "", url);
};

const onPopState = handler => {
    window.onpopstate = handler;
};

// Use class ___ extends React.Component if we need to introduce state
// Or if lifecycle methods are required
class App extends React.Component {
    static propTypes = {
        initialData: PropTypes.object.isRequired
    };

    state = this.props.initialData;

    // Handle when user presses browser forward and back buttons
    componentDidMount() {
        onPopState((event) => {
            this.setState({
                // if event.state is null, initialise it with empty object
                currentContestId: (event.state || {}).currentContestId
                // above will either return the currentContestId or null (for empty object)
            });
        });
    }

    componentWillUnmount() {
        onPopState(null);
    }

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

    fetchContestList = () => {
        pushState(
            { currentContestId: null },
            "/"
        );

        api.fetchContestList()
            .then(contests => {
                this.setState({
                    currentContestId: null,
                    contests
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

    fetchNames = (nameIds) => {
        if (nameIds.length === 0) {
            return;
        }
        api.fetchNames(nameIds)
            .then(names => {
                this.setState({
                    names
                });
            });
    };

    lookupName = (nameId) => {
        if (!this.state.names || !this.state.names[nameId]) {
            return {
                name: "..."
            };
        }
        return this.state.names[nameId];
    };

    currentContent() {
        if (this.state.currentContestId) {
            return <Contest
                contestListClick={this.fetchContestList}
                fetchNames={this.fetchNames}
                lookupName={this.lookupName}
                {...this.currentContest()}
            />;
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