// import axios from 'axios'
// import React from 'react'
// import { useState } from 'react'
// import {  useNavigate } from 'react-router-dom'

// import { useEffect } from 'react'



// function StudentProfile() {

//   const navigate=useNavigate()
//   const [studentData,setStudentData]=useState([])

//    const token=localStorage.getItem("token")

//   useEffect(()=>{
    
//      axios.get('http://localhost:5000/loginStudentDetail',{
//       headers:{
//         Authorization:`Bearer ${token}`
//       }
//      })
//      .then((res)=>{
//        setStudentData(res.data.data)
//        console.log(res.data.data);
//      })
//      .catch((err)=>{
//         console.log("error in fetch the student data in profile",err);
//      })
//   },[])
//   return (

//     <>
//        {
//         studentData.map((item)=>(
//           <div className='flex flex-col justify-center gap-5 ' key={item.studentId}>
//             <div className='flex justify-center mt-3 ' onClick={()=>navigate('/studentHomePage')}>
//             <button className='px-3 py-2 bg-red-500 text-white  w-30 rounded-xl '>Home page</button>
//             </div>
//          <h1 className='text-center text-2xl font-bold  '>Student Details</h1>
//          <div className='ml-5 mr-5'>
//           <table className='w-full border-1 border-black table-fixed text-center border-collapse'>
//            <tbody >
//              <tr className='border-1 border-black '>
//               <th  className='border-1 border-black p-2' >Name</th>
//               <td>{item.student_name}</td>
//              </tr>
//               <tr  className='border-1 border-black'>
//               <th className='border-1 border-black p-2' >email</th>
//               <td>{item.student_email}</td>
//              </tr>
//               <tr className='border-1 border-black'>
//               <th className='border-1 border-black p-2'>Branch</th>
//               <td>{item.student_branch}</td>
//              </tr>
//               <tr className='border-1 border-black'>
//               <th className='border-1 border-black p-2'>Roll no</th>
//               <td>{item.student_rollno}</td>
//              </tr>
//               <tr  className='border-1 border-black'>
//               <th className='border-1 border-black p-2' >Phone no</th>
//               <td>{item.student_phone}</td>
//              </tr>
//               <tr className='border-1 border-black'>
//               <th className='border-1 border-black p-2'>City</th>
//               <td>{item.student_city}</td>
//              </tr>
//               <tr className='border-1 border-black'>
//               <th className='border-1 border-black p-2'>State</th>
//               <td>{item.student_state}</td>
//              </tr>
//               <tr  className='border-1 border-black'>
//               <th className='border-1 border-black p-2' >isActive</th>
//               <td>{item.isActive}</td>
//              </tr>
//              </tbody>
//           </table>
//           </div>
//            </div>
//         ))
//        }
//     </>
//   )
// }

// export default StudentProfile




import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function StudentProfile() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/loginStudentDetail", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setStudentData(res.data.data))
      .catch((err) => console.error(err));
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 flex flex-col items-center py-12 animate-gradient-x">
      {studentData.map((item) => (
        <div
          key={item.studentId}
          className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-4xl p-8 md:p-12 border border-white/30"
        >
          {/* Header with avatar */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <FaUserCircle className="text-7xl text-purple-600" />
              <h1 className="text-3xl font-bold text-purple-700">{item.student_name}</h1>
            </div>
            <button
              onClick={() => navigate("/studentHomePage")}
              className="px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl shadow-lg transition duration-300"
            >
              Home
            </button>
          </div>

          {/* Student Details Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <tbody>
                {Object.entries({
                  "Email": item.student_email,
                  "Branch": item.student_branch,
                  "Roll Number": item.student_rollno,
                  "Phone": item.student_phone,
                  "City": item.student_city,
                  "State": item.student_state,
                  "Active": item.isActive ? "Yes" : "No",
                }).map(([key, value]) => (
                  <tr
                    key={key}
                    className="border-b border-gray-300 hover:bg-purple-50 transition duration-200 cursor-pointer"
                  >
                    <th className="py-3 px-4 font-medium text-gray-700 w-1/3">{key}</th>
                    <td className="py-3 px-4 text-gray-800">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-gray-600">
            Your profile details are securely stored.
          </p>
        </div>
      ))}
    </div>
  );
}

export default StudentProfile;


