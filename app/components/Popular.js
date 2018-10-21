const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');
const api = require('../utils/api');

function SelectLanguage(props) {
    const languages = ['all', 'javascript', 'ruby', 'python', 'css', 'java'];
    return (
        <ul className="languages">
            {languages.map(function(language) {
                return (
                    <li
                        style={
                            language === props.activeLanguage
                                ? { color: '#d0021b' }
                                : null
                        }
                        key={language}
                        onClick={props.onSelect.bind(null, language)}
                    >
                        {language}
                    </li>
                );
            }, this)}
        </ul>
    );
}

function ReposGrid(props) {
    return (
        <ul className={'popular-list'}>
            {props.repos.map(function(repo, index) {
                return (
                    <li key={repo.name} className="popular-item">
                        <div className="popular-rank">#{index + 1}</div>
                        <ul className="space-list-item">
                            <li>
                                <img
                                    className="avatar"
                                    src={repo.owner.avatar_url}
                                    alt={'avatar for ' + repo.owner.login}
                                />
                            </li>
                            <li>
                                <a href={repo.html_url}>{repo.name}</a>
                            </li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                );
            })}
        </ul>
    );
}

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLanguage: 'all',
            repos: null
        };

        this.currentLanguage = this.currentLanguage.bind(this);
    }

    componentDidMount() {
        this.currentLanguage(this.state.activeLanguage);
    }

    currentLanguage(language) {
        this.setState(function() {
            return {
                activeLanguage: language,
                repos: null
            };
        });

        api.fetchPopularRepos(language).then(
            function(repos) {
                this.setState(function() {
                    return { repos: repos };
                });
            }.bind(this)
        );
    }

    render() {
        return (
            <div>
                <SelectLanguage
                    onSelect={this.currentLanguage}
                    activeLanguage={this.state.activeLanguage}
                />

                {!this.state.repos ? (
                    <p>Loading...</p>
                ) : (
                    <ReposGrid repos={this.state.repos} />
                )}
            </div>
        );
    }
}

SelectLanguage.propTypes = {
    activeLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};
ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
};

module.exports = Popular;
// 10minutes https://learn.tylermcginnis.com/courses/50507/lectures/2466734
