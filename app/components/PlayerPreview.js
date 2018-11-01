const React = require('react');
const PropTypes = require('prop-types');

function PlayerPreview(props) {
    return (
        <div className="column">
            <img
                className="avatar"
                srcSet={props.playerImg}
                alt={props.name + ' avatar'}
            />
            <h2 className="username">@{props.playerName}</h2>
            {props.children}
        </div>
    );
}

PlayerPreview.propTypes = {
    playerImg: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired
};

module.exports = PlayerPreview;
