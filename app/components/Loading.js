import React from 'react';
import PropTypes from 'prop-types';

const style = {
    content: {
        textAlign: 'center',
        fontSize: '35px'
    }
};
export default class Loading extends React.Component {
    static defaultProps = {
        text: 'Loading',
        speed: 300
    };

    static propTypes = {
        text: PropTypes.string.isRequired,
        speed: PropTypes.number.isRequired
    };

    state = {
        text: this.props.text
    };

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
