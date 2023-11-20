import { FaUser ,FaCheckCircle} from "react-icons/fa";
import { RiTodoLine } from "react-icons/ri";
import {IoMdAdd} from 'react-icons/io';
import {PiSealWarningFill} from 'react-icons/pi';
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { BsExclamationSquareFill } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";
import {BiSignal1,BiSignal2,BiSignal3,BiSignal4,BiSignal5} from 'react-icons/bi'

export const iconData={
    user:[
      <FaUser color="red"/>,
      <FaUser color="green"/>,
      <FaUser color="blue"/>,
      <FaUser color="yellow"/>,
      <FaUser color='orange'/>,
    ],
    priority:[
   <BiSignal1/>,
   <BiSignal2/>,
   <BiSignal3/>,
   <BiSignal4/>,
   <BiSignal5/>   ],
    status:[
      <RiTodoLine color='black'/>,
      <FaCheckCircle color='green'/>,
      <MdOutlinePendingActions color='red'/>
    ]

  }
  export const priorityData=[
    'No Priority',
'Low',
'Medium',
'High',
'Urgent'
  ]