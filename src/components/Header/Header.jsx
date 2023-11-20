import React from 'react';
import './Header.css';
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

function Header({showOptions}) {
    return ( 
        <div className='header'>
            <div className="button" onClick={showOptions}><HiOutlineAdjustmentsHorizontal color='#818589'/><span className='gap'></span>Display<span className='gap'></span>▼</div>
        </div>
     );
}

export default Header;