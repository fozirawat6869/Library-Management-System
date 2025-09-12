
import bgimage from '../images/libraryimage.jpg'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
// import he from 'he'
import '@fortawesome/fontawesome-free/css/all.min.css';

function StudentHomePage() {
   const token=localStorage.getItem("token")
    const navigate=useNavigate()
   const [studentData,setStudentData]=useState([])

    useEffect(()=>{
      axios.get('http://localhost:5000/loginStudentDetail',{
        headers:{
          Authorization:`Bearer ${token}`
    }})
    .then(response=>{
      console.log('Student Details:', response.data);
      setStudentData(response.data.data)
    })
    .catch(error=>{
      console.error('Error fetching student details:', error);
    });
    
   },[token])

    function handleOnclick(select) {
      console.log('Clicked:', select);
    if (select==="edit") {
       navigate('/editStudentProfile')
    }}

  return (
    <>
       <div  style={{backgroundImage:`url(${bgimage})`,
                           backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed' }} className="bg-cover w-full min-h-screen text-center ">
             
        {
         studentData.map((item)=>(
          <div key={item.studentId} >
                   <div className='flex gap-5 justify-around bg-orange-900 px-4 py-4 items-center'>
            <div className='text-white font-bold text-l' >Home</div>
            <div className='text-white font-bold text-l'>asdf</div>
            <div className='text-white font-bold text-l'>ggd</div>
            <div onClick={()=>navigate('/bookingDetails')} className='cursor-pointer text-white font-bold text-l'>Booking details</div>
            <div className='text-white font-bold text-l flex cursor-pointer ' onClick={()=>navigate('/studentProfile')}>
              <div className='flex items-center gap-3'>
                <span className='flex justify-center border-1 border-white rounded-full p-1'>
                  <i className="fas fa-user  " ></i>
                </span>
                <div className='flex flex-col '>
                   <div>Profile</div>
                   <div>{item.student_name}</div>
                </div>
              </div>
              {/* <div>
               
                </div> */}
            </div>
           </div>
         </div> 
         ))
        }       
         
           </div>


          
         
        
          
          
         

          
    </>
  )
}

export default StudentHomePage