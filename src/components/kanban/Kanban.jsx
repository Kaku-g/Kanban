import React,{useEffect,useRef,useState} from 'react';
import './Kanban.css';
import { data } from '../../data/data';
import Card from '../Card/Card';
import Option from '../Options/Option';
import { FaUser ,FaCheckCircle} from "react-icons/fa";
import { RiTodoLine } from "react-icons/ri";
import {IoMdAdd} from 'react-icons/io';
import {PiSealWarningFill} from 'react-icons/pi';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsExclamationSquareFill } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";
import {BiSignal1,BiSignal2,BiSignal3,BiSignal4,BiSignal5} from 'react-icons/bi'
import Header from '../Header/Header';
const Kanban=()=> {

  const taskRef= useRef('null');
  const laneRef=useRef('null');
  const boardRef=useRef('null');
  let draggables='null';
  let droppables='null';

  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('');
  const [finalData,setFinalData]=useState();
  const [options,setShowOptions]=useState(false);

  const { tickets, users } = data;

  const iconData={
    user:[
      <FaUser/>,
      <FaUser/>,
      <FaUser/>,
      <FaUser/>,
      <FaUser/>,
    ],
    priority:[
   <BiSignal1/>,
   <BiSignal2/>,
   <BiSignal3/>,
   <BiSignal4/>,
   <BiSignal5/>   ],
    status:[
      <RiTodoLine/>,
      <FaCheckCircle/>,
      <MdOutlinePendingActions/>
    ]

  }
  const priorityData=[
    'No Priority',
'Low',
'Medium',
'High',
'Urgent'
  ]
 const groupTickets = () => {
    if (groupBy === 'status') {
      const groupedByStatus = {};
      tickets.forEach(ticket => {
        if (!groupedByStatus[ticket.status]) {
          groupedByStatus[ticket.status] = [];
        }
        groupedByStatus[ticket.status].push(ticket);
      });
      return groupedByStatus;
    }

    if (groupBy === 'user') {
      const groupedByUser = {};
      tickets.forEach(ticket => {
        const user = users.find(u => u.id === ticket.userId);
        const userName = user ? user.name : 'Unassigned';
        if (!groupedByUser[userName]) {
          groupedByUser[userName] = [];
        }
        groupedByUser[userName].push(ticket);
      });
      return groupedByUser;
    }

    if (groupBy === 'priority') {
      const groupedByPriority = {};
      tickets.forEach(ticket => {
        if (!groupedByPriority[ticket.priority]) {
          groupedByPriority[ticket.priority] = [];
        }
        groupedByPriority[ticket.priority].push(ticket);
      });
      return groupedByPriority;
    }
  };

  // Sorting tickets based on the selected criteria
  const sortTickets = () => {
    let cloneData={...finalData}
    Object.keys(cloneData).forEach(key => {
      cloneData[key].sort((a, b) => {
        if (sortBy === 'priority') {
          return b.priority - a.priority;
        }
        if (sortBy === 'title') {
          const titleA = a.title.toUpperCase();
          const titleB = b.title.toUpperCase();
          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        }
        return 0;
      });
    });
    return cloneData;
  };
  useEffect(()=>{
    if(boardRef.current){
    draggables = boardRef.current.querySelectorAll('.task');
     droppables = boardRef.current.querySelectorAll('.swim-lane');
    }

 
    console.log(data)
    draggables.forEach((task) => {
        task.addEventListener("dragstart", () => {
          task.classList.add("is-dragging");
        });
        task.addEventListener("dragend", () => {
          task.classList.remove("is-dragging");
        });
      });
      
      droppables.forEach((zone) => {
        zone.addEventListener("dragover", (e) => {
          e.preventDefault();
      
          const bottomTask = insertAboveTask(zone, e.clientY);
          const curTask = document.querySelector(".is-dragging");
      
          if (!bottomTask) {
            zone.appendChild(curTask);
          } else {
            zone.insertBefore(curTask, bottomTask);
          }
        });
      });
      
      const insertAboveTask = (zone, mouseY) => {
        const els = zone.querySelectorAll(".task:not(.is-dragging)");
      
        let closestTask = null;
        let closestOffset = Number.NEGATIVE_INFINITY;
      
        els.forEach((task) => {
          const { top } = task.getBoundingClientRect();
      
          const offset = mouseY - top;
      
          if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
          }
        });
      
        return closestTask;
      };
     // setFinalData(sortTickets(groupTickets()))
     // setFinalData(finalData)
     sortTickets(finalData);

  },[finalData])

  useEffect(()=>{

    let d= groupTickets();
   //  let temp= sortTickets(d);
    setFinalData(d);
    console.log(d);
  },[groupBy])

  useEffect(()=>{
    if(finalData){
    let k=sortTickets();
    setFinalData(k);
    console.log(k);
    }
    
  },[sortBy])
//   useEffect(()=>{

//   },[finalData])
    
const setSort=(value)=>
{
     setSortBy(value);
}

const setGroup=(value)=>{

  setGroupBy(value)
}
const showOptions=()=>{
     setShowOptions(!options);
}

    return (



    <div ref={boardRef} className="board">
      <Header showOptions={showOptions}/>
      {options!=false?  <Option sorting={setSort} grouping={setGroup} groupBy={groupBy} sortBy={sortBy}/>:''}
     
      
      {/* <div className='group-by'>
      <label>Group By:</label>
        <select value={groupBy} onChange={e => setGroupBy(e.target.value)}>
          <option value="status">Status</option>
          <option value="user">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      <div className='sort-by'>
      <label>Sort By:</label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
         <option value="">Select</option>
        <option value="title">Title</option>
          <option value="priority">Priority</option>
         
        </select>
      </div> */}
     
      <div className="lanes">
        { 
           finalData && Object.keys(finalData).map((el,index)=>(
            <div ref={laneRef} className="swim-lane">
              <div className="kanban-headers">
                <div className='kanban-headers-left'>
                <span style={{fontSize:'20px'}}>{iconData[groupBy][index]}</span> 
                <span className="heading">{groupBy!='priority'?el:priorityData[el]}<span className='count-gap'></span><span style={{color:'gray',fontSize:'18px'}}>{finalData[el].length}</span></span>
                </div>
              
                <div className="const-icons">
                <span><IoMdAdd/></span> 
                <span><BiDotsHorizontalRounded/></span>
                </div>
              
              </div>
            {
               finalData&& finalData[el].map(task=>
                <Card groupBy={groupBy} sortBy={sortBy} className='task' draggable='true' {...task} />
                    // <p className='task' draggable='true'>{task.title}</p>
                )

            }
            
  
  
          </div>
           ))
        }
        
      </div>
    </div>
  
      );
}

export default Kanban ;