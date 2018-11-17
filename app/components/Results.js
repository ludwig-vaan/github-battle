const api = require('../utils/api');
const Link = require('react-router-dom').Link;
const PlayerPreview = require('./PlayerPreview');
const PropTypes = require('prop-types');
const queryString = require('query-string');
const React = require('react');
const Loading = require('./Loading');

const Profile = ({ info }) => {
    const {
        avatar_url,
        login,
        name,
        location,
        company,
        followers,
        following,
        public_repos,
        blog
    } = info;
    return (
        <PlayerPreview playerImg={avatar_url} playerName={login}>
            <ul className="space-list-items">
                {name && <li>{name}</li>}
                {location && <li>{location}</li>}
                {company && <li>{company}</li>}
                <li>Followers: {followers}</li>
                <li>Following: {following}</li>
                <li>Public Repos: {public_repos}</li>
                {blog && (
                    <li>
                        <a href={blog}>{blog}</a>
                    </li>
                )}
            </ul>
        </PlayerPreview>
    );
};

Profile.propTypes = {
    info: PropTypes.object.isRequired
};

const Player = ({ label, score, profile }) => (
    <div>
        <h1 className="header">{label}</h1>
        <h3 style={{ textAlign: 'center' }}>Score: {score}</h3>
        <Profile info={profile} />
    </div>
);

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
        const { location } = this.props;
        const { playerOneName, playerTwoName } = queryString.parse(
            location.search
        );
        battleResults = api
            .battle([playerOneName, playerTwoName])
            .then(([winner, loser]) =>
                (winner && loser) === null
                    ? this.setState({
                          error:
                              'There is an error. Check that both users if exist on GitHub !',
                          loading: false
                      })
                    : this.setState({
                          error: null,
                          loading: false,
                          winner: winner,
                          loser: loser
                      })
            );
    }

    render() {
        const { loser, winner, error, loading } = this.state;

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
