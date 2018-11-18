import React from 'react';
import PropTypes from 'prop-types';

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

export default PlayerPreview;
