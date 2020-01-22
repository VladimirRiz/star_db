import React from 'react';

import './header.css'

const Header = () =>{
    return(
        <div className='header d-flex'>
            <h1>StarDB</h1>
            <ul className='d-flex'>
                <li>
                    <a href='#'>Peolpe</a>
                </li>
                <li>
                    <a href='#'>Planets</a>
                </li>
                <li>
                    <a href='#'>StartShips</a>
                </li>
            </ul>
        </div>
    )
};

export default Header;