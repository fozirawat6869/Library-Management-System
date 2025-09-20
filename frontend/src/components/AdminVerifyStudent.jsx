// import React, { useEffect,useState } from 'react'
// import axios from 'axios'
// import { use } from 'react'
// import { Navigate } from 'react-router-dom'


// function AdminVerifyStudent() {
//      const token=localStorage.getItem("token")
//      const [studentData,setStudentData]=useState([])
//      const [bg,setBg]=useState({})
//     //  const [studentActive,setStudentActive]=useState('')

       
//         const fetchFunction=()=>{

       
//           axios.get("http://localhost:5000/studentDetails",
      
//         {
//           headers:{
//             Authorization:`Bearer ${token}`
//           }
//         }
//       )
//       .then((res)=>{
//         console.log(res.data)
//         setStudentData(res.data.data)
       
//       })
//       .catch((err)=>{
//       console.log("error in fetching student details ",err)
//     })
//   }
//   useEffect(()=>{
//     fetchFunction()
//   },[])

  

 
 

//    function handleOnclick(status,studentId){
   
//       setBg((prev)=>{
//         const newBg={...prev}
//           // if clicked same button again → remove
//       if(newBg[studentId]===status){
//         delete newBg[studentId]
//       }else{
//           // otherwise set the new status (works for both active & deactive)
//         newBg[studentId]=status
//       }
//       return newBg

//       })
 
   
//    }
//    function onClickhandler(studentId){
//     const status=bg[studentId]
//     if(!status){
//       alert("please select the any button to submit")
//       return
//     }
//     console.log(status)  // it has the active or deactive
//         axios.post("http://localhost:5000/activeOrdeactive",{studentId,status},{
//         headers:{
//           Authorization:`Bearer ${token}`
//         }
//       })
//       .then((res)=>{
//         console.log(res.data)
//         // setStudentData(res.data.data)
       
//          const student=studentData.find((item)=>item.studentId===studentId)
//          if(student.isActive===1 && status==="active"){
//               alert ("student is already active")
//               return
//          }
//            if(student.isActive===0 && status==="deactive"){
//               alert ("student is already deactive")
//               return
//          }

//         if(res.data.message==="activated"){
//           alert(`Studetn of id=${studentId} is active`)
//           fetchFunction()
//           return
//         }
//         if(res.data.message==="deactivated"){
//           alert(`Student of id=${studentId} is deactive`)
//           fetchFunction()
//           return
//         }
      
       
//       })
//       .catch((err)=>{
//         console.log("error in fetching post req in activeOrdeactive",err)
//       })
//    }




   

//   return (
//     <>
//     <h1 className='text-center text-3xl font-bold mt-5'>Verify Student</h1>
         
//            <div className='flex flex-wrap justify-center gap-5 pt-10 px-10 pb-10'>
//           {
//             studentData.map((item)=>(

//                 <table  key={item.studentId} className='w-[100%] border-black border-1 text-left border-collapse table-fixed' >
//                    <thead>
//                     <tr className='border-black border-1 '>
//                         <th className='border-black border-1 p-2 '>Student id</th>
//                         <th className='border-black border-1 p-2 '>Student name</th>
//                         <th className='border-black border-1 text-left p-2'>Branch name</th>
//                         <th className='border-black border-1 text-left p-2'>Student state</th>
//                         <th className='border-black border-1 text-left p-2'>Student city</th>
//                         <th className='border-black border-1 text-left p-2'>Student phone no</th>
//                         <th className='border-black border-1 text-left p-2'>Student active/deactive</th>
//                         <th className='border-black border-1 text-left p-2'>Student active/deactive</th>

//                     </tr>
//                     </thead> 
//                     <tbody>
//                     <tr  className='border-black border-1'>
//                         <td className='border-black border-1 p-2'>{item.studentId}</td>
//                         <td className='border-black border-1 p-2'>{item.student_name}</td>
//                         <td className='border-black border-1 p-2'>{item.student_branch}</td>
//                         <td className='border-black border-1 p-2'>{item.student_state}</td>
//                         <td className='border-black border-1 p-2'>{item.student_city}</td>
//                         <td className='border-black border-1 p-2'>{item.student_phone}</td>
//                         <td className='border-black border-1 p-2'>{item.isActive}</td>

//                         <td className='border-black border-1 p-2'>
//                             <div className='flex gap-2 justify-center'> 
//                                 <button 
//                                 onClick={()=>handleOnclick("active",item.studentId)} 
//                                 className={ `border-green-500 border-1 px-[2px]  rounded-[5px] ${bg[item.studentId]==="active" ? "bg-green-500 text-white":" text-black"}  cursor-pointer `}>
//                                     Active</button>
//                                 <button
//                                 onClick={()=>handleOnclick("deactive",item.studentId)}
//                                  className={`border-red-500 border-1 px-[2px] rounded-[5px] cursor-pointer ${bg[item.studentId]==="deactive" ?"bg-red-500 text-white":"text-black"}`}>
                                 
//                                     Deactive</button>
//                             </div>
//                             <div className='flex justify-center'>
//                                 <button 
//                                 className='cursor-pointer border-black border-1 px-1 mt-2 rounded-[5px]'
//                                 onClick={()=>onClickhandler(item.studentId)}>submit</button>
//                             </div>
//                         </td>

//                     </tr>
//                     </tbody>
//                 </table>

                
//     //            <div key={item.studentId} className=' w-[350px] h-[400px] rounded-xl bg-white   ' >
//     //        <h1 className='pt-7 text-3xl font-bold underline offset-4'>Students Detail's</h1>
//     //       <h1 className='pt-6 text-xl '>Student name:-{item.student_name}</h1>
//     //       <h1 className='pt-2 text-xl '>Branch name:-{item.student_branch}</h1>
//     //       <h1 className='pt-2 text-xl '>Student state:-{item.student_state}</h1>
//     //       <h1 className='pt-2 text-xl '>Student city:-{item.student_city}</h1>
//     //       <h1 className='pt-2 text-xl '>Student phone no:-{item.student_phone}</h1>
          
//     //    <form onSubmit={(e)=>handleSubmit(e,item.studentId)}>
//     //      <div className='flex gap-5 justify-center pt-2'>
//     //           <div>
//     //              <label htmlFor="active" className=' text-xl font-bold'>Active</label> <br />
//     //       <input onChange={()=>setActivee(activee===1?0:1)} type="checkbox"  name="active" id="active" className='pt-2 text-2xl' />
         
//     //       </div>
//     //       <div>
//     //          <label htmlFor="deactive" className=' text-xl font-bold'>Deactive</label><br />
//     //       <input onChange={()=>setDeactivee(deactivee===0?1:0)}  type="checkbox"  name="deactive" id="deactive" className='pt-2 text-2xl' />
//     //       </div>
           
//     //      </div>
//     //      <div className='flex justify-center mt-4'>
//     //      <input type="submit" value={"Submit"}  className='  text-xl  text-center bg-green-500 text-white px-2 py-1 cursor-pointer rounded-xl '/>
          
//     //      </div>
        
//     //      </form>
//     //     </div>

//             ))
//           }
//        </div>


      
   
      
//     </>
//   )
// }

// export default AdminVerifyStudent






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function AdminVerifyStudent() {
  const token = localStorage.getItem("token");
  const [studentData, setStudentData] = useState([]);
  const [bg, setBg] = useState({});

  const fetchFunction = () => {
    axios.get("http://localhost:5000/studentDetails", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => setStudentData(res.data.data))
      .catch((err) => console.log("error in fetching student details ", err));
  }

  useEffect(() => {
    fetchFunction();
  }, []);

  function handleOnclick(status, studentId) {
    setBg((prev) => {
      const newBg = { ...prev };
      if (newBg[studentId] === status) delete newBg[studentId];
      else newBg[studentId] = status;
      return newBg;
    });
  }

  function onClickhandler(studentId) {
    const status = bg[studentId];
    if (!status) {
      alert("please select any button to submit");
      return;
    }

    axios.post("http://localhost:5000/activeOrdeactive", { studentId, status }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        const student = studentData.find((item) => item.studentId === studentId);
        if (student.isActive === 1 && status === "active") {
          alert("student is already active");
          return;
        }
        if (student.isActive === 0 && status === "deactive") {
          alert("student is already deactive");
          return;
        }
        if (res.data.message === "activated") {
          alert(`Student of id=${studentId} is active`);
          fetchFunction();
        }
        if (res.data.message === "deactivated") {
          alert(`Student of id=${studentId} is deactive`);
          fetchFunction();
        }
      })
      .catch((err) => console.log("error in fetching post req in activeOrdeactive", err));
  }

  return (
    <>
      <h1 className='text-center text-5xl font-extrabold mt-8 text-gradient-to-r from-purple-600 via-indigo-500 to-blue-500'>
        Verify Student
      </h1>

      <div className='flex flex-wrap justify-center gap-8 pt-10 px-4 md:px-10 pb-10'>
        {
          studentData.map((item) => (
            <table
              key={item.studentId}
              className='w-full max-w-7xl border border-gray-300 rounded-xl shadow-xl overflow-hidden text-left table-fixed bg-gradient-to-r from-gray-100 to-gray-50'
            >
              <thead className='bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white'>
                <tr>
                  <th className='p-4'>Student ID</th>
                  <th className='p-4'>Student Name</th>
                  <th className='p-4'>Branch Name</th>
                  <th className='p-4'>State</th>
                  <th className='p-4'>City</th>
                  <th className='p-4'>Phone</th>
                  <th className='p-4'>Active</th>
                  <th className='p-4'>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className='hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition duration-300'>
                  <td className='p-3 border-b'>{item.studentId}</td>
                  <td className='p-3 border-b'>{item.student_name}</td>
                  <td className='p-3 border-b'>{item.student_branch}</td>
                  <td className='p-3 border-b'>{item.student_state}</td>
                  <td className='p-3 border-b'>{item.student_city}</td>
                  <td className='p-3 border-b'>{item.student_phone}</td>
                  <td className='p-3 border-b'>{item.isActive}</td>
                  <td className='p-3 border-b  '>
                    <div className='flex gap-3 justify-center mb-2 '>
                      <button
                        onClick={() => handleOnclick("active", item.studentId)}
                        className={`px-2 py-1 rounded-lg font-semibold transition duration-300 border-1 border-green-500 ${
                          bg[item.studentId] === "active" ? "bg-green-500 text-white shadow-lg" : "text-green-600 hover:bg-green-500 hover:text-white"
                        }`}
                      >
                        Active
                      </button>
                      <button
                        onClick={() => handleOnclick("deactive", item.studentId)}
                        className={` px-2 py-1 rounded-lg font-semibold transition duration-300 border-1 border-red-500 ${
                          bg[item.studentId] === "deactive" ? "bg-red-500 text-white shadow-lg" : "text-red-600 hover:bg-red-500 hover:text-white"
                        }`}
                      >
                        Deactive
                      </button>
                    </div>
                    <div className='flex justify-center'>
                      <button
                        onClick={() => onClickhandler(item.studentId)}
                        className='px-2 py-1 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-lg shadow-lg transition duration-300'
                      >
                        Submit
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ))
        }
      </div>
    </>
  )
}

export default AdminVerifyStudent;
