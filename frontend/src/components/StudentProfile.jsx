import axios from 'axios'
import React from 'react'
import { useState } from 'react'

import { useEffect } from 'react'

function StudentProfile() {
  const [studentData,setStudentData]=useState([])

   const token=localStorage.getItem("token")

  useEffect(()=>{
    
     axios.get('http://localhost:5000/loginStudentDetail',{
      headers:{
        Authorization:`Bearer ${token}`
      }
     })
     .then((res)=>{
       setStudentData(res.data.data)
       console.log(res.data.data);
     })
     .catch((err)=>{
        console.log("error in fetch the student data in profile",err);
     })
  },[])
  return (

    <>
       {
        studentData.map((item)=>(
          <div className='flex flex-col justify-center gap-5 ' key={item.studentId}>
            <h1 className='text-center text-2xl font-bold '>Student Details</h1>
         <div className='ml-5 mr-5'>
          <table className='w-full border-1 border-black table-fixed text-center border-collapse'>
           <tbody >
             <tr className='border-1 border-black '>
              <th  className='border-1 border-black p-2' >Name</th>
              <td>{item.student_name}</td>
             </tr>
              <tr  className='border-1 border-black'>
              <th className='border-1 border-black p-2' >email</th>
              <td>{item.student_email}</td>
             </tr>
              <tr className='border-1 border-black'>
              <th className='border-1 border-black p-2'>Branch</th>
              <td>{item.student_branch}</td>
             </tr>
              <tr className='border-1 border-black'>
              <th className='border-1 border-black p-2'>Roll no</th>
              <td>{item.student_rollno}</td>
             </tr>
              <tr  className='border-1 border-black'>
              <th className='border-1 border-black p-2' >Phone no</th>
              <td>{item.student_phone}</td>
             </tr>
              <tr className='border-1 border-black'>
              <th className='border-1 border-black p-2'>City</th>
              <td>{item.student_city}</td>
             </tr>
              <tr className='border-1 border-black'>
              <th className='border-1 border-black p-2'>State</th>
              <td>{item.student_state}</td>
             </tr>
              <tr  className='border-1 border-black'>
              <th className='border-1 border-black p-2' >isActive</th>
              <td>{item.isActive}</td>
             </tr>
             </tbody>
          </table>
          </div>
           </div>
        ))
       }
    </>
  )
}

export default StudentProfile