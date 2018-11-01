const api = require('../utils/api');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');
const PropTypes = require('prop-types');
const queryString = require('query-string');
const React = require('react');
const Loading = require('./Loading');

function Profile(props) {
    const info = props.info;
    return (
        <PlayerPreview playerImg={info.avatar_url} playerName={info.login}>
            <ul className="space-list-items">
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && (
                    <li>
                        <a href={info.blog}>{info.blog}</a>
                    </li>
                )}
            </ul>
        </PlayerPreview>
    );
}

Profile.propTypes = {
    info: PropTypes.object.isRequired
};

function Player(props) {
    return (
        <div>
            <h1 className="header">{props.label}</h1>
            <h3 style={{ textAlign: 'center' }}>Score: {props.score}</h3>
            <Profile info={props.profile} />
        </div>
    );
}

Player.propTypes = {
    label: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    profile: PropTypes.object.isRequired
};

class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        };
    }

    componentDidMount() {
        const players = queryString.parse(this.props.location.search);
        battleResults = api
            .battle([players.playerOneName, players.playerTwoName])
            .then(
                function(results) {
                    if (results === null) {
                        this.setState(function() {
                            return {
                                error:
                                    'There is an error. Check that both users if exist on GitHub ! ',
                                loading: false
                            };
                        });
                    } else {
                        this.setState(function() {
                            return {
                                error: null,
                                loading: false,
                                winner: results[0],
                                loser: results[1]
                            };
                        });
                    }
                }.bind(this)
            );
    }

    render() {
        const loser = this.state.loser;
        const winner = this.state.winner;
        const error = this.state.error;
        const loading = this.state.loading;

        if (loading === true) {
            return <Loading />;
        }

        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to="/battle">Reset</Link>
                </div>
            );
        }

        return (
            <div>
                <div className="row">
                    <Player
                        label="Winner"
                        score={winner.score}
                        profile={winner.profile}
                    />
                    <Player
                        label="Loser"
                        score={loser.score}
                        profile={loser.profile}
                    />
                </div>
            </div>
        );
    }
}

module.exports = Results;
