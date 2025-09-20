
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import he from 'he'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

function StudentHomePage() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [studentData, setStudentData] = useState([])
  const [branchIcon, setBranchIcon] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/loginStudentDetail', {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => setStudentData(response.data.data))
    .catch(error => console.error(error))
  }, [token])

  useEffect(() => {
    axios.get("http://localhost:5000/branchIcons", {
      headers: { Authorization: `Bearer ${token}` }
    }, { withCredentials: true })
    .then(res => setBranchIcon(res.data.data))
    .catch(err => console.log(err))
  }, [])

  const handleOnclickk = (id, name) => {
    navigate(`/books/${id}/${name}`)
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-indigo-400 via-indigo-300 to-blue-400 flex flex-col items-center py-12">
      {studentData.map((item) => (
        <React.Fragment key={item.studentId}>

          <div className='flex gap-10 items-center  mb-15 '>
            <h1 className= 'text-white text-5xl font-bold '>Student Profile</h1>
            <h1 className={`text-2xl px-4 py-2 font-bold text-white rounded-xl ${item.isActive===1?"bg-green-500":"bg-red-500"}`}>{item.isActive===1?"Active":"Deactive"}</h1>
          </div>
       
          
          <div className='flex gap-6 justify-around bg-indigo-600 px-6 py-4 items-center rounded-3xl shadow-2xl w-full max-w-6xl mb-15 text-white'>
            <div className='font-bold text-2xl cursor-pointer hover:text-yellow-400 transition duration-300 hover:scale-105'>Home</div>
            <div className='font-bold text-2xl cursor-pointer hover:text-yellow-400  transition duration-300 hover:scale-105'>Library</div>
            <div className='font-bold text-2xl cursor-pointer hover:text-yellow-400  transition duration-300 hover:scale-105'>About</div>
            <div
              onClick={() => {
                if (studentData[0].isActive) navigate('/bookingDetails')
                else alert("Your account is not active")
              }}
              className='font-bold text-2xl cursor-pointer hover:text-yellow-400  transition duration-300 hover:scale-105'
            >
              Booking Details
            </div>
            <div
              onClick={() => {
                if (studentData[0].isActive) navigate('/studentProfile')
                else alert("Your account is not active")
              }}
              className='flex items-center gap-3 cursor-pointer hover:scale-105 transition-all duration-300'
            >
              <div className='w-10 h-10 text-white'>
                <FaUserCircle className='w-full h-full' />
              </div>
              <div className='flex flex-col text-left'>
                <div className='font-semibold text-xl'>Profile</div>
                <div className='font-bold text-xl'>{item.student_name}</div>
              </div>
            </div>
          </div>


         


          {/* Branch Buttons */}
          <div className="flex flex-wrap gap-6 justify-center">
            {branchIcon.map((branch) => (
              <button
                key={branch.branchId}
                onClick={() => handleOnclickk(branch.branchId, branch.branch_name)}
                className="w-[180px] h-[220px] flex flex-col justify-center items-center rounded-3xl shadow-2xl
                           bg-gradient-to-br from-indigo-500 via-indigo-600 to-blue-500
                           hover:from-blue-500 hover:via-indigo-500 hover:to-indigo-600
                           transform hover:scale-105 transition-all duration-300 cursor-pointer border-white border-1"
              >
                <div className="text-[80px]">{he.decode(branch.branch_icon)}</div>
                <p className="text-center font-bold text-lg mt-3 text-white drop-shadow-md">{branch.branch_name}</p>
              </button>
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default StudentHomePage












// import bgimage from '../images/libraryimage.jpg'
// import { useNavigate } from 'react-router-dom'
// import { useEffect } from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import he from 'he'
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import { Navigate } from 'react-router-dom'
// import React from 'react'

// function StudentHomePage() {
//    const token=localStorage.getItem("token")
//     const navigate=useNavigate()
//    const [studentData,setStudentData]=useState([])

//    const [branchIcon,setBranchIcon]=useState([])


//     useEffect(()=>{
//       axios.get('http://localhost:5000/loginStudentDetail',{
//         headers:{
//           Authorization:`Bearer ${token}`
//     }})
//     .then(response=>{
//       console.log('Student Details:', response.data);
//       setStudentData(response.data.data)
//     })
//     .catch(error=>{
//       console.error('Error fetching student details:', error);
//     });
    
//    },[token])

//     // function handleOnclick(select) {
//     //   console.log('Clicked:', select);
//     // if (select==="edit") {
//     //    navigate('/editStudentProfile')
//     // }}


//  // branch code heree
 
//   //  const navigate=useNavigate()
   
//   //  const [branchIcon,setBranchIcon]=useState([])
  
//    useEffect(()=>{
//      const token=localStorage.getItem("token")
//       axios.get("http://localhost:5000/branchIcons",
//          {
//            headers:{
//              Authorization:`Bearer ${token}`
//            }
//          }
//          ,
//         {withCredentials:true}  )
 
  
//       .then((res)=>{
//        console.log(res.data)
 
//        setBranchIcon(res.data.data)
//       })
//       .catch((err)=>{
//        console.log(err)
//       })
//    },[])
 
 
//     const handleOnclickk=(id,name)=>{
//        // setBranchId(id)
//         navigate(`/books/${id}/${name}`)
//     }

//   return (
//     <>
//        <div  style={{backgroundImage:`url(${bgimage})`,
//                            backgroundSize: 'cover',
//           backgroundRepeat: 'no-repeat',
//           backgroundAttachment: 'fixed' }} className="bg-cover w-full min-h-screen text-center "
//         >
             
//         {
//          studentData.map((item)=>(
//           <React.Fragment key={item.studentId}>
//           <div key={item.studentId} >
//                    <div className='flex gap-5 justify-around bg-orange-900 px-4 py-4 items-center'>
//             <div className='text-white font-bold text-l' >Home</div>
//             <div className='text-white font-bold text-l'>asdf</div>
//             <div className='text-white font-bold text-l'>ggd</div>
//             <div  onClick={()=>{ 
//                 if(studentData[0].isActive){
//                   navigate('/bookingDetails')
//                    }else{
//                     alert("your account is not active")
//                    }
//                   }} className='cursor-pointer text-white font-bold text-l'>Booking details</div>
//             <div className='text-white font-bold text-l flex cursor-pointer ' 
//             onClick={()=>{ 
//                 if(studentData[0].isActive){
//                   navigate('/studentProfile')
//                    }else{
//                     alert("your account is not active")
//                    }
//                   }}
//              >
//               <div className='flex items-center gap-3' 
             
//               >
//                 <span className='flex justify-center border-1 border-white rounded-full p-1'>
//                   <i className="fas fa-user  " ></i>
//                 </span>
//                 <div className='flex flex-col '>
//                    <div>Profile</div>
//                    <div>{item.student_name}</div>
//                 </div>
//               </div>
//               {/* <div>
               
//                 </div> */}
//             </div>
//            </div>
//          </div> 

//           <div className=' '>
               
                    
//                     <div className="flex gap-5 justify-center p-5">
//                         {branchIcon.map((item)=>(
//                          <button  onClick={()=>handleOnclickk(item.branchId,item.branch_name)} className="bg-white rounded-lg cursor-pointer" key={item.branchId}>
//                            <div className="text-[100px] text-center w-[160px]" >{he.decode(item.branch_icon)}</div>
//                            <p className="text-center  font-bold text-xl pb-1">{item.branch_name}</p>
//                          </button>
//                         ))
         
//                         }
//                     </div>
         
                  
//             </div>
         
//          </React.Fragment>
//          ))
//         }  


         
//            </div>


     
         
        
          
          
         

  
//      </>
//   )
//  }

// export default StudentHomePage





