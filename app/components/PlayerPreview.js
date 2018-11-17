const React = require('react');
const PropTypes = require('prop-types');

const PlayerPreview = ({ playerImg, name, playerName, children }) => (
    <div className="column">
        <img className="avatar" srcSet={playerImg} alt={name + ' avatar'} />
        <h2 className="username">@{playerName}</h2>
        {children}
    </div>
);

PlayerPreview.propTypes = {
    playerImg: PropTypes.string.isRequired,
    playerName: PropTypes.string.isRequired
};

module.exports = PlayerPreview;
