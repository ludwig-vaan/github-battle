const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = require('prop-types');

class SelectLanguage extends React.Component {
    render() {
        const languages = [
            'all',
            'javascript',
            'ruby',
            'python',
            'css',
            'java'
        ];
        return (
            <ul className="languages">
                {languages.map(function(language) {
                    return (
                        <li
                            style={
                                language === this.props.activeLanguage
                                    ? { color: '#d0021b' }
                                    : null
                            }
                            key={language}
                            onClick={this.props.onSelect.bind(null, language)}
                        >
                            {language}
                        </li>
                    );
                }, this)}
            </ul>
        );
    }
}

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeLanguage: 'all'
        };

        this.currentLanguage = this.currentLanguage.bind(this);
    }

    currentLanguage(language) {
        this.setState(function() {
            return { activeLanguage: language };
        });
    }

    render() {
        return (
            <div>
                <SelectLanguage
                    onSelect={this.currentLanguage}
                    activeLanguage={this.state.activeLanguage}
                />
            </div>
        );
    }
}

SelectLanguage.propTypes = {
    activeLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};

module.exports = Popular;
// 10minutes https://learn.tylermcginnis.com/courses/50507/lectures/2466734
