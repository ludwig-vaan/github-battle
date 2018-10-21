const React = require('react');
const PropTypes = require('prop-types');
const Popular = require('./popular.js');
const ReactRouter = require('react-router-dom');
const Nav = require('./Nav');
const Home = require('./Home');
const Battle = require('./Battle');

const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Switch = ReactRouter.Switch;

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/battle" component={Battle} />
                        <Route exact path="/popular" component={Popular} />
                        <Route
                            render={function() {
                                return <p>Not found...</p>;
                            }}
                        />
                    </Switch>
                </div>
            </Router>
        );
    }
}

module.exports = App;
