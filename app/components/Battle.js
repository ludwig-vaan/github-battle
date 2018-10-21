const React = require('react');
const Link = require('react-router-dom').Link;
const PropTypes = require('prop-types');

function PlayerPreview(props) {
    return (
        <div className="column">
            <img
                className="avatar"
                srcSet={props.playerImg}
                alt={props.name + ' avatar'}
            />
            <h2 className="username">@{props.playerName}</h2>
            <button
                className="reset"
                onClick={props.onReset.bind(null, props.id)}
            >
                reset
            </button>
        </div>
    );
}

PlayerPreview.propTypes = {
    id: PropTypes.string.isRequired,
    playerImg: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
};

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
        this.resetPlayer = this.resetPlayer.bind(this);
    }

    submitPlayer(id, username) {
        this.setState(function() {
            const newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Img'] =
                'https://github.com/' + username + '.png?size=200';
            return newState;
        });
    }

    resetPlayer(id) {
        this.setState(function() {
            const newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Img'] = null;
            return newState;
        });
    }

    playerRender(playerId, playerName, playerImg) {
        if (!playerName) {
            return (
                <Player
                    id={playerId}
                    label="Player One"
                    onSubmit={this.submitPlayer}
                />
            );
        } else {
            return (
                <PlayerPreview
                    id={playerId}
                    playerImg={playerImg}
                    playerName={playerName}
                    onReset={this.resetPlayer}
                />
            );
        }
    }

    render() {
        console.log(process.env.githubID);
        const playerOneName = this.state.playerOneName;
        const playerTwoName = this.state.playerTwoName;
        const playerOneImg = this.state.playerOneImg;
        const playerTwoImg = this.state.playerTwoImg;
        const match = this.props.match;

        return (
            <div>
                <h1>Battle Component</h1>
                <div className="row">
                    {this.playerRender(
                        'playerOne',
                        playerOneName,
                        playerOneImg
                    )}

                    {!playerTwoName && (
                        <Player
                            id="playerTwo"
                            label="Player Two"
                            onSubmit={this.submitPlayer}
                        />
                    )}
                    {playerTwoName && (
                        <PlayerPreview
                            id="playerTwo"
                            playerImg={playerTwoImg}
                            playerName={playerTwoName}
                            onReset={this.resetPlayer}
                        />
                    )}
                </div>
                {playerOneName &&
                    playerTwoName && (
                        <Link
                            className="button"
                            to={{
                                pathname: match.url + '/results',
                                search:
                                    '?playerOneName:' +
                                    playerOneName +
                                    '&playerTwoName' +
                                    playerTwoName
                            }}
                        >
                            Battle
                        </Link>
                    )}
            </div>
        );
    }
}

module.exports = Battle;
