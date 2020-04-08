import React from 'react';
import logo from '../bean.svg';

function Header() {
    return (
        <div id="header">
            <h4><img src={logo} alt="Coffee Bean" />Coffee Roasters <span>in the San Francisco Bay Area</span></h4>
        </div>
    );
}

export default Header;
