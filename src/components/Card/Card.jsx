import React from 'react';
import './Card.css';
import { FaUser ,FaCheckCircle} from "react-icons/fa";
import { RiTodoLine } from "react-icons/ri";
import {IoMdAdd} from 'react-icons/io';
import {PiSealWarningFill} from 'react-icons/pi';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsExclamationSquareFill } from "react-icons/bs";



const Card=({id,title,tag,groupBy,sortBy})=> {
    return (  

        <div className="card-body task " draggable='true'>
            <div className="card-header">
                <span className="task-id">{id}</span>
                {groupBy!='user'?<FaUser/>:''}
            </div>
            <div className="card-title">{title}</div>
            <div className="card-footer">
             
                <BsExclamationSquareFill className="card-footer-icon"/>
             
                <div className="card-tag">
                    
                    <span className='card-tag-name'><span style={{opacity:'90%',marginRight:'5px'}}>⬤ </span>{tag}</span>
                </div>
            </div>
        </div>
    );
}

export default Card;