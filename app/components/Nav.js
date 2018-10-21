const React = require('react');
const NavLink = require('react-router-dom').NavLink;

function navigation() {
    return (
        <ul className="nav">
            <li>
                <NavLink exact activeClassName="active" to="/">
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/Battle">
                    Battle
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName="active" to="/Popular">
                    Popular
                </NavLink>
            </li>
        </ul>
    );
}

module.exports = navigation;
