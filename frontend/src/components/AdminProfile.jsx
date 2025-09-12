import React from 'react'
import bgimage from '../images/libraryimage.jpg'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminProfile() {


const [activee,setActivee]=useState(0)
const [deactivee,setDeactivee]=useState(0)
const [bookingStudent,setBookingStudent]=useState([])
  
const token=localStorage.getItem("token")
  

   const navigate=useNavigate()




  function handleClick(name){
    if(name==="verifyStudent"){
       navigate('/verifyStudent')
    }
    if(name==="booking"){
      navigate('/bookingStatus')
    }
  }





  return (
    <div  style={{backgroundImage:`url(${bgimage})`,
                     backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed' }} className="bg-cover w-full min-h-screen text-center ">
       
     <h1 className='text-orange-500 font-bold p-10 text-5xl underline offset-4'>Admin Profile</h1>
     <div className='flex flex-wrap gap-5 justify-center   pt-5' >

        <div  onClick={()=>handleClick("profile")}  className='cursor-pointer bg-green-500 w-[250px] h-[100px] rounded-xl flex justify-center items-center'>
         <h1 className='text-white font-bold text-3xl'>Profile</h1>
        </div>
        <div onClick={()=>handleClick("verifyStudent")} className='cursor-pointer bg-green-500 w-[250px] h-[100px] rounded-xl flex justify-center items-center'>
         <h1 className='text-white font-bold text-3xl'>Verify Student</h1>
        </div>
        <div className='cursor-pointer bg-green-500 w-[250px] h-[100px] rounded-xl flex justify-center items-center'>
         <h1 className='text-white font-bold text-3xl'>Add Book</h1>
        </div>
         <div onClick={()=>handleClick("booking")} className='cursor-pointer bg-green-500 w-[250px] h-[100px] rounded-xl flex justify-center items-center'>
         <h1 className='text-white font-bold text-3xl'>Booking Status</h1>
        </div>
     </div>
    
   
    
    
    </div>
  )
}

export default AdminProfile