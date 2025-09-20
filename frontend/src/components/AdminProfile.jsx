
import { useNavigate } from 'react-router-dom';

function AdminProfile() {

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
    <div className="w-full min-h-screen bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 flex flex-col items-center justify-start py-12 relative overflow-hidden">
       
     <h1 className='text-white font-extrabold p-10 text-5xl  '>Admin Profile</h1>
     
     <div className='flex flex-wrap gap-8 justify-center pt-5'>
        <div  onClick={()=>handleClick("profile")}  
              className='cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 w-[250px] h-[120px] rounded-3xl flex justify-center items-center shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl'>
         <h1 className='text-white font-bold text-3xl drop-shadow-md'>Profile</h1>
        </div>

        <div onClick={()=>handleClick("verifyStudent")} 
             className='cursor-pointer bg-gradient-to-r from-green-400 to-green-600 w-[250px] h-[120px] rounded-3xl flex justify-center items-center shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl'>
         <h1 className='text-white font-bold text-3xl drop-shadow-md'>Verify Student</h1>
        </div>
        <div className='cursor-pointer bg-gradient-to-r from-purple-500 to-purple-700 w-[250px] h-[120px] rounded-3xl flex justify-center items-center shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl'>
         <h1 className='text-white font-bold text-3xl drop-shadow-md'>Add Book</h1>
        </div>

         <div onClick={()=>handleClick("booking")} 
              className='cursor-pointer bg-gradient-to-r from-pink-400 to-pink-600 w-[250px] h-[120px] rounded-3xl flex justify-center items-center shadow-xl transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl'>
         <h1 className='text-white font-bold text-3xl drop-shadow-md'>Booking Status</h1>
        </div>
     </div>
    </div>
  )
}

export default AdminProfile




// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function AdminProfile() {

// const [activee,setActivee]=useState(0)
// const [deactivee,setDeactivee]=useState(0)
// const [bookingStudent,setBookingStudent]=useState([])

// const token=localStorage.getItem("token")
// const navigate=useNavigate()

// function handleClick(name){
//     if(name==="verifyStudent"){
//        navigate('/verifyStudent')
//     }
//     if(name==="booking"){
//       navigate('/bookingStatus')
//     }
// }

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-tr from-indigo-400 via-purple-400 to-pink-400 flex flex-col items-center justify-start py-12 relative overflow-hidden">
       
//      <h1 className='text-white font-extrabold p-10 text-5xl underline decoration-yellow-300 drop-shadow-xl'>Admin Profile</h1>
     
//      <div className='flex flex-wrap gap-8 justify-center pt-5 z-10 relative'>
//         <div  onClick={()=>handleClick("profile")}  
//               className='cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 w-[250px] h-[120px] rounded-3xl flex justify-center items-center shadow-2xl transform hover:scale-105 transition-transform duration-300 hover:shadow-3xl'>
//          <h1 className='text-white font-bold text-3xl drop-shadow-md'>Profile</h1>
//         </div>

//         <div onClick={()=>handleClick("verifyStudent")} 
//              className='cursor-pointer bg-gradient-to-r from-green-400 to-green-600 w-[250px] h-[120px] rounded-3xl flex justify-center items-center shadow-2xl transform hover:scale-105 transition-transform duration-300 hover:shadow-3xl'>
//          <h1 className='text-white font-bold text-3xl drop-shadow-md'>Verify Student</h1>
//         </div>

//         <div className='cursor-pointer bg-gradient-to-r from-purple-500 to-purple-700 w-[250px] h-[120px] rounded-3xl flex justify-center items-center shadow-2xl transform hover:scale-105 transition-transform duration-300 hover:shadow-3xl'>
//          <h1 className='text-white font-bold text-3xl drop-shadow-md'>Add Book</h1>
//         </div>

//          <div onClick={()=>handleClick("booking")} 
//               className='cursor-pointer bg-gradient-to-r from-pink-400 to-pink-600 w-[250px] h-[120px] rounded-3xl flex justify-center items-center shadow-2xl transform hover:scale-105 transition-transform duration-300 hover:shadow-3xl'>
//          <h1 className='text-white font-bold text-3xl drop-shadow-md'>Booking Status</h1>
//         </div>
//      </div>

//      {/* Decorative circles at bottom */}
//      <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-yellow-300 rounded-full opacity-50 animate-pulse"></div>
//      <div className="absolute bottom-10 right-10 w-[200px] h-[200px] bg-purple-300 rounded-full opacity-40 animate-pulse"></div>
//      <div className="absolute bottom-20 left-1/2 w-[100px] h-[100px] bg-pink-300 rounded-full opacity-30 animate-pulse"></div>

//     </div>
//   )
// }

// export default AdminProfile




// import React from 'react'
// import bgimage from '../images/libraryimage.jpg'
// import { useState } from 'react'
// import axios from 'axios';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function AdminProfile() {


// const [activee,setActivee]=useState(0)
// const [deactivee,setDeactivee]=useState(0)
// const [bookingStudent,setBookingStudent]=useState([])
  
// const token=localStorage.getItem("token")
  

//    const navigate=useNavigate()




//   function handleClick(name){
//     if(name==="verifyStudent"){
//        navigate('/verifyStudent')
//     }
//     if(name==="booking"){
//       navigate('/bookingStatus')
//     }
//   }





//   return (
//     <div  style={{backgroundImage:`url(${bgimage})`,
//                      backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
//     backgroundAttachment: 'fixed' }} className="bg-cover w-full min-h-screen text-center ">
       
//      <h1 className='text-orange-500 font-bold p-10 text-5xl underline offset-4'>Admin Profile</h1>
//      <div className='flex flex-wrap gap-5 justify-center   pt-5' >

//         <div  onClick={()=>handleClick("profile")}  className='cursor-pointer bg-green-500 w-[250px] h-[100px] rounded-xl flex justify-center items-center'>
//          <h1 className='text-white font-bold text-3xl'>Profile</h1>
//         </div>
//         <div onClick={()=>handleClick("verifyStudent")} className='cursor-pointer bg-green-500 w-[250px] h-[100px] rounded-xl flex justify-center items-center'>
//          <h1 className='text-white font-bold text-3xl'>Verify Student</h1>
//         </div>
//         <div className='cursor-pointer bg-green-500 w-[250px] h-[100px] rounded-xl flex justify-center items-center'>
//          <h1 className='text-white font-bold text-3xl'>Add Book</h1>
//         </div>
//          <div onClick={()=>handleClick("booking")} className='cursor-pointer bg-green-500 w-[250px] h-[100px] rounded-xl flex justify-center items-center'>
//          <h1 className='text-white font-bold text-3xl'>Booking Status</h1>
//         </div>
//      </div>
    
   
    
    
//     </div>
//   )
// }

// export default AdminProfile