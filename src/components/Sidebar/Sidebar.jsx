import React, { useContext, useState } from 'react'
import { FiMenu } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { LuMessageSquare } from "react-icons/lu";
import { GoQuestion } from "react-icons/go";
import { GoHistory } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";
import './Sidebar.css'
import { Context } from '../../Context/Context';
const Sidebar = () => {

     const [extended, setExtended] = useState(true)
     const {onSent, prevPrompts, setRecentPrompt, newChat} = useContext(Context)
 
     const loadPrompt = async (prompt)=> {
      setRecentPrompt(prompt)
      await onSent(prompt)
     }


  return (
    <div className='sidebar'>
      <div className="top">
      <FiMenu onClick={()=>setExtended(prev=>!prev)} className='menu' />


      <div onClick={()=> newChat()} className='new-chat'>
      <CiCirclePlus className='img' />


     {extended? <p>New Chat</p>:null}
      </div>


      {extended? 
      <div className="recent">
      <p className="recent-title">Recent</p>
      {prevPrompts.map((item, index)=> {
        return(
           <div onClick={()=>loadPrompt(item)} className="recent-entry">
      <LuMessageSquare className='img' />
      <p>{item.slice(0,14)}...</p>
      </div>
        )
      })}
     
    </div>
    : null
    }
      
      </div>
      <div className="bottom">
       <div className="bottom-item recent-entry">
       <GoQuestion className='img'/>
       {extended?<p>Help</p>: null}
       </div>
       <div className="bottom-item recent-entry">


       <GoHistory className='img'/>
       {extended?<p>Activity</p>: null}
       </div>
       <div className="bottom-item recent-entry">
       <IoSettingsOutline className='img'/>
       {extended?<p>Setting</p>: null}
       </div>
      </div>
    </div>
  )
}

export default Sidebar
