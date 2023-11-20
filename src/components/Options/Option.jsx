import React from 'react';
import './Option.css';

const Option=({sorting,grouping,groupBy,sortBy})=> {
    return ( 
        <div className='options'>
             <div className='group-by'>
      <label>Grouping</label>
        <select className='select' value={groupBy} onChange={(e)=>grouping(e.target.value)}>
            
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
        <span className='select-icon'>▼</span>
      </div>
      <div className='sort-by'>
      <label>Sorting<span className='gap'></span></label>
        <select className='select' value={sortBy} onChange={(e)=> sorting(e.target.value)}>
         <option value="">Select</option>
        <option value="title">Title</option>
          <option value="priority">Priority</option>
         
        </select>
        <span className='select-icon'>▼</span>
      </div>
        </div>
     );
}

export default Option;