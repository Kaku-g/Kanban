import React from 'react';
import './Card.css';


const Card=({id,title,tag})=> {
    return (  

        <div className="card-body task " draggable='true'>
            <div className="card-header">
                <span className="task-id">{id}</span>
                <img className='card-photo' src="" alt="" />
            </div>
            <div className="card-title">{title}</div>
            <div className="card-footer">
                <img src="" alt="" className="card-footer-icon" />
                <div className="card-tag">
                    <span className='card-status-color'></span>
                    <span className='card-tag-name'>{tag}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;