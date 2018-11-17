const React = require('react');
const Link = require('react-router-dom').Link;
const PropTypes = require('prop-types');
const PlayerPreview = require('./PlayerPreview');

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
        console.log(username);
        this.setState(() => ({
            username
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.props.id, this.state.username);
    }
    render() {
        const { id, label } = this.props;
        const { username } = this.state;
        return (
            <div key={id}>
                <form className="column" onSubmit={this.handleSubmit}>
                    <label className="header" htmlFor="username">
                        {label}
                    </label>
                    <input
                        id="username"
                        placeholder="github username"
                        name="username"
                        type="text"
                        autoComplete="off"
                        value={username}
                        onChange={this.handleUsername}
                    />
                    <button className="button" disabled={!username}>
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
        this.setState(() => ({
            [id + 'Name']: username,
            [id + 'Img']: `https://github.com/${username}.png?size=200`
        }));
    }

    resetPlayer(id) {
        this.setState(() => ({
            [id + 'Name']: '',
            [id + 'Img']: null
        }));
    }

    playerRender(playerId, playerName, playerImg) {
        if (!playerName) {
            return (
                <Player
                    id={playerId}
                    label="Player"
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
                >
                    <button
                        className="reset"
                        onClick={() => this.resetPlayer(playerId)}
                    >
                        reset
                    </button>
                </PlayerPreview>
            );
        }
    }

    render() {
        const {
            playerOneName,
            playerTwoName,
            playerOneImg,
            playerTwoImg
        } = this.state;
        const { match } = this.props;

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
                        >
                            <button
                                className="reset"
                                onClick={() => this.resetPlayer('playerTwo')}
                            >
                                reset
                            </button>
                        </PlayerPreview>
                    )}
                </div>
                {playerOneName && playerTwoName && (
                    <Link
                        className="button"
                        to={{
                            pathname: match.url + '/results',
                            search: `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
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
