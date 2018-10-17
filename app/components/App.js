const React = require("react");
const PropTypes = require("prop-types");
const Popular = require("./popular.js");

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Hello World</h1>
                <Popular />
            </div>
        );
    }
}

module.exports = App;
