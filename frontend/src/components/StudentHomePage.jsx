
import bgimage from '../images/libraryimage.jpg'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import he from 'he'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Navigate } from 'react-router-dom'
import React from 'react'

function StudentHomePage() {
   const token=localStorage.getItem("token")
    const navigate=useNavigate()
   const [studentData,setStudentData]=useState([])

   const [branchIcon,setBranchIcon]=useState([])


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

    // function handleOnclick(select) {
    //   console.log('Clicked:', select);
    // if (select==="edit") {
    //    navigate('/editStudentProfile')
    // }}


 // branch code heree
 
  //  const navigate=useNavigate()
   
  //  const [branchIcon,setBranchIcon]=useState([])
  
   useEffect(()=>{
     const token=localStorage.getItem("token")
      axios.get("http://localhost:5000/branchIcons",
         {
           headers:{
             Authorization:`Bearer ${token}`
           }
         }
         ,
        {withCredentials:true}  )
 
  
      .then((res)=>{
       console.log(res.data)
 
       setBranchIcon(res.data.data)
      })
      .catch((err)=>{
       console.log(err)
      })
   },[])
 
 
    const handleOnclickk=(id,name)=>{
       // setBranchId(id)
        navigate(`/books/${id}/${name}`)
    }

  return (
    <>
       <div  style={{backgroundImage:`url(${bgimage})`,
                           backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed' }} className="bg-cover w-full min-h-screen text-center "
        >
             
        {
         studentData.map((item)=>(
          <React.Fragment key={item.studentId}>
          <div key={item.studentId} >
                   <div className='flex gap-5 justify-around bg-orange-900 px-4 py-4 items-center'>
            <div className='text-white font-bold text-l' >Home</div>
            <div className='text-white font-bold text-l'>asdf</div>
            <div className='text-white font-bold text-l'>ggd</div>
            <div  onClick={()=>{ 
                if(studentData._isActive){
                  navigate('/bookingDetails')
                   }else{
                    alert("your account is not active")
                   }
                  }} className='cursor-pointer text-white font-bold text-l'>Booking details</div>
            <div className='text-white font-bold text-l flex cursor-pointer ' 
            onClick={()=>{ 
                if(studentData._isActive){
                  navigate('/studentProfile')
                   }else{
                    alert("your account is not active")
                   }
                  }} >
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

          <div className=' '>
                  {/* <ul className='flex bg-blue-800'>
                   <li className='text-white py-3 px-8 hover:bg-blue-700  cursor-pointer text-center font-bold'>Home</li>
                   <li className='text-white py-3 px-8 hover:bg-blue-700  cursor-pointer text-center font-bold'>Any</li>
                   <li className='text-white py-3 px-8 hover:bg-blue-700  cursor-pointer text-center font-bold'>About</li>
                   <li className='text-white py-3 px-8 hover:bg-blue-700  cursor-pointer text-center font-bold'>Contact</li>
                   <li className='text-white py-3 px-8 hover:bg-blue-700  cursor-pointer text-center font-bold '>Profile</li>
                  </ul> */}
                    
                    <div className="flex gap-5 justify-center p-5">
                        {branchIcon.map((item)=>(
                         <button  onClick={()=>handleOnclickk(item.branchId,item.branch_name)} className="bg-white rounded-lg cursor-pointer" key={item.branchId}>
                           <div className="text-[100px] text-center w-[160px]" >{he.decode(item.branch_icon)}</div>
                           <p className="text-center  font-bold text-xl pb-1">{item.branch_name}</p>
                         </button>
                        ))
         
                        }
                    </div>
         
                  
            </div>
         
         </React.Fragment>
         ))
        }  


         
           </div>


     
         
        
          
          
         

  
     </>
  )
 }

export default StudentHomePage





