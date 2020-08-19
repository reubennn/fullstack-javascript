import React from "react";
import Header from "./Header";

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
        pageHeader: "Naming Contests"
    };
    render() {
        return (
            <div className="App">
                <Header message={this.state.pageHeader} />
                <p className="text-center">
                    ...
                </p>
            </div>
        );
    }
}

// Define default prop values
App.defaultProps = {
    headerMessage: "Hello!!"
};

export default App;