import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

const SelectLanguage = ({ activeLanguage, onSelect }) => {
    const languages = ['all', 'javascript', 'ruby', 'python', 'css', 'java'];
    return (
        <ul className="languages">
            {languages.map(language => (
                <li
                    style={
                        language === activeLanguage
                            ? { color: '#d0021b' }
                            : null
                    }
                    key={language}
                    onClick={() => onSelect(language)}
                >
                    {language}
                </li>
            ))}
        </ul>
    );
};

const ReposGrid = ({ repos }) => (
    <ul className={'popular-list'}>
        {repos.map(({ name, owner, html_url, stargazers_count }, index) => (
            <li key={name} className="popular-item">
                <div className="popular-rank">#{index + 1}</div>
                <ul className="space-list-item">
                    <li>
                        <img
                            className="avatar"
                            src={owner.avatar_url}
                            alt={'avatar for ' + owner.login}
                        />
                    </li>
                    <li>
                        <a href={html_url}>{name}</a>
                    </li>
                    <li>@{owner.login}</li>
                    <li>{stargazers_count} stars</li>
                </ul>
            </li>
        ))}
    </ul>
);

export default class Popular extends React.Component {
    state = {
        activeLanguage: 'all',
        repos: null
    };
    componentDidMount() {
        this.currentLanguage(this.state.activeLanguage);
    }

    currentLanguage = async language => {
        this.setState({
            activeLanguage: language,
            repos: null
        });

        const repos = await fetchPopularRepos(language);
        this.setState({ repos });
    };

    render() {
        const { activeLanguage, repos } = this.state;
        return (
            <div>
                <SelectLanguage
                    onSelect={this.currentLanguage}
                    activeLanguage={activeLanguage}
                />

                {!repos ? (
                    <Loading text={'Downloading'} />
                ) : (
                    <ReposGrid repos={repos} />
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
