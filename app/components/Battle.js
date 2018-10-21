const React = require('react');
const Link = require('react-router-dom');
const PropTypes = require('prop-types');

class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsername(event) {
        const username = event.target.value;
        this.setState(function() {
            return {
                username: username
            };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username);
    }
    render() {
        return (
            <div key={this.props.id}>
                <form className="column" onSubmit={this.handleSubmit}>
                    <label className="header" htmlFor="username">
                        {this.props.label}
                    </label>
                    <input
                        id="username"
                        placeholder="github username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={this.state.username}
                        onChange={this.handleUsername}
                    />
                    <button className="button" disabled={!this.state.username}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

Player.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOneName: '',
            playerOneImg: null,
            playerTwoName: '',
            playerTwoImg: null
        };

        this.submitPlayer = this.submitPlayer.bind(this);
    }

    submitPlayer(id, username) {
        this.setState(function() {
            const newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Img'] =
                'http://github.com/' + username + '.pgn/?size=200';
            return newState;
        });
    }

    render() {
        const playerOneName = this.state.playerOneName;
        const playerTwoName = this.state.playerTwoName;

        return (
            <div>
                <h1>Battle Component</h1>
                <div className="row">
                    {!playerOneName && (
                        <Player
                            id="playerOne"
                            label="Player One"
                            onSubmit={this.submitPlayer}
                        />
                    )}

                    {!playerTwoName && (
                        <Player
                            id="playerTwo"
                            label="Player Two"
                            onSubmit={this.submitPlayer}
                        />
                    )}
                </div>
            </div>
        );
    }
}

module.exports = Battle;
