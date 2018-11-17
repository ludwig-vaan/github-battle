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
        this.setState({
            activeLanguage: language,
            repos: null
        });

        fetchPopularRepos(language).then(repos => this.setState({ repos }));
    }

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
