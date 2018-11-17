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
        const { text, speed } = this.props;
        const stopper = `${text}...`;
        this.interval = window.setInterval(() => {
            const { text: currentText } = this.state;
            currentText === stopper
                ? this.setState(() => ({
                      text: this.props.text
                  }))
                : this.setState(prevState => ({
                      text: prevState.text + '.'
                  }));
        }, speed);
    }

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }

    render() {
        const { text } = this.state;
        return <p style={style.content}>{text}</p>;
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
