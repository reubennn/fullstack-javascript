import React from "react";
import axios from "axios";
import Header from "./Header";
import ContestPreview from "./ContestPreview";

// Use class ___ extends React.Component if we need to introduce state
// Or if lifecycle methods are required
class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         test: 42
    //     };
    // }
    // The above is equivalent to:
    state = {
        pageHeader: "Naming Contests",
        contests: []
    };
    componentDidMount() {
        axios.get("/api/contests")
            .then(res => {
                this.setState({
                    contests: res.data.contests
                });
            })
            .catch(console.error);
    }
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

export default App;