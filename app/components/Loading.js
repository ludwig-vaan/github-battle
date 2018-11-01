const React = require('react');
const PropTypes = require('prop-types');

const style = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
};
class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text
        };
    }

    componentDidMount() {
        const stopper = this.props.text + '...';
        this.interval = window.setInterval(
            function() {
                if (this.state.text === stopper) {
                    this.setState(function() {
                        return {
                            text: this.props.text
                        };
                    });
                }
                this.setState(function(prevState) {
                    return {
                        text: prevState.text + '.'
                    };
                });
            }.bind(this),
            this.props.speed
        );
    }

    componentWillMount() {
        window.clearInterval(this.interval);
    }

    render() {
        return <p style={style.content}>{this.state.text}</p>;
    }
}

Loading.defaultProps = {
    text: 'Loading',
    speed: 300
};

Loading.propTypes = {
    text: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired
};

module.exports = Loading;
