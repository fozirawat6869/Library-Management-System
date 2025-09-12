import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { use } from 'react'


function AdminVerifyStudent() {
     const token=localStorage.getItem("token")
     const [studentData,setStudentData]=useState([])
     const [bg,setBg]=useState({})
    //  const [studentActive,setStudentActive]=useState('')

       
        const fetchFunction=()=>{

       
          axios.get("http://localhost:5000/studentDetails",
      
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      .then((res)=>{
        console.log(res.data)
        setStudentData(res.data.data)
       
      })
      .catch((err)=>{
      console.log("error in fetching student details ",err)
    })
  }
  useEffect(()=>{
    fetchFunction()
  },[])

  

 
 

   function handleOnclick(status,studentId){
   
      setBg((prev)=>{
        const newBg={...prev}
          // if clicked same button again → remove
      if(newBg[studentId]===status){
        delete newBg[studentId]
      }else{
          // otherwise set the new status (works for both active & deactive)
        newBg[studentId]=status
      }
      return newBg

      })
 
   
   }
   function onClickhandler(studentId){
    const status=bg[studentId]
    if(!status){
      alert("please select the any button to submit")
      return
    }
    console.log(status)  // it has the active or deactive
        axios.post("http://localhost:5000/activeOrdeactive",{studentId,status},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then((res)=>{
        console.log(res.data)
        // setStudentData(res.data.data)
       
         const student=studentData.find((item)=>item.studentId===studentId)
         if(student.isActive===1 && status==="active"){
              alert ("student is already active")
              return
         }
           if(student.isActive===0 && status==="deactive"){
              alert ("student is already deactive")
              return
         }

        if(res.data.message==="activated"){
          alert(`Studetn of id=${studentId} is active`)
          fetchFunction()
          return
        }
        if(res.data.message==="deactivated"){
          alert(`Student of id=${studentId} is deactive`)
          fetchFunction()
          return
        }
      
       
      })
      .catch((err)=>{
        console.log("error in fetching post req in activeOrdeactive",err)
      })
   }
   

  return (
    <>
    <h1 className='text-center text-3xl font-bold mt-5'>Verify Student</h1>
         
           <div className='flex flex-wrap justify-center gap-5 pt-10 px-10 pb-10'>
          {
            studentData.map((item)=>(

                <table  key={item.studentId} className='w-[100%] border-black border-1 text-left border-collapse table-fixed' >
                   <thead>
                    <tr className='border-black border-1 '>
                        <th className='border-black border-1 p-2 '>Student id</th>
                        <th className='border-black border-1 p-2 '>Student name</th>
                        <th className='border-black border-1 text-left p-2'>Branch name</th>
                        <th className='border-black border-1 text-left p-2'>Student state</th>
                        <th className='border-black border-1 text-left p-2'>Student city</th>
                        <th className='border-black border-1 text-left p-2'>Student phone no</th>
                        <th className='border-black border-1 text-left p-2'>Student active/deactive</th>
                        <th className='border-black border-1 text-left p-2'>Student active/deactive</th>

                    </tr>
                    </thead> 
                    <tbody>
                    <tr  className='border-black border-1'>
                        <td className='border-black border-1 p-2'>{item.studentId}</td>
                        <td className='border-black border-1 p-2'>{item.student_name}</td>
                        <td className='border-black border-1 p-2'>{item.student_branch}</td>
                        <td className='border-black border-1 p-2'>{item.student_state}</td>
                        <td className='border-black border-1 p-2'>{item.student_city}</td>
                        <td className='border-black border-1 p-2'>{item.student_phone}</td>
                        <td className='border-black border-1 p-2'>{item.isActive}</td>

                        <td className='border-black border-1 p-2'>
                            <div className='flex gap-2 justify-center'> 
                                <button 
                                onClick={()=>handleOnclick("active",item.studentId)} 
                                className={ `border-green-500 border-1 px-[2px]  rounded-[5px] ${bg[item.studentId]==="active" ? "bg-green-500 text-white":" text-black"}  cursor-pointer `}>
                                    Active</button>
                                <button
                                onClick={()=>handleOnclick("deactive",item.studentId)}
                                 className={`border-red-500 border-1 px-[2px] rounded-[5px] cursor-pointer ${bg[item.studentId]==="deactive" ?"bg-red-500 text-white":"text-black"}`}>
                                 
                                    Deactive</button>
                            </div>
                            <div className='flex justify-center'>
                                <button 
                                className='cursor-pointer border-black border-1 px-1 mt-2 rounded-[5px]'
                                onClick={()=>onClickhandler(item.studentId)}>submit</button>
                            </div>
                        </td>

                    </tr>
                    </tbody>
                </table>
    //            <div key={item.studentId} className=' w-[350px] h-[400px] rounded-xl bg-white   ' >
    //        <h1 className='pt-7 text-3xl font-bold underline offset-4'>Students Detail's</h1>
    //       <h1 className='pt-6 text-xl '>Student name:-{item.student_name}</h1>
    //       <h1 className='pt-2 text-xl '>Branch name:-{item.student_branch}</h1>
    //       <h1 className='pt-2 text-xl '>Student state:-{item.student_state}</h1>
    //       <h1 className='pt-2 text-xl '>Student city:-{item.student_city}</h1>
    //       <h1 className='pt-2 text-xl '>Student phone no:-{item.student_phone}</h1>
          
    //    <form onSubmit={(e)=>handleSubmit(e,item.studentId)}>
    //      <div className='flex gap-5 justify-center pt-2'>
    //           <div>
    //              <label htmlFor="active" className=' text-xl font-bold'>Active</label> <br />
    //       <input onChange={()=>setActivee(activee===1?0:1)} type="checkbox"  name="active" id="active" className='pt-2 text-2xl' />
         
    //       </div>
    //       <div>
    //          <label htmlFor="deactive" className=' text-xl font-bold'>Deactive</label><br />
    //       <input onChange={()=>setDeactivee(deactivee===0?1:0)}  type="checkbox"  name="deactive" id="deactive" className='pt-2 text-2xl' />
    //       </div>
           
    //      </div>
    //      <div className='flex justify-center mt-4'>
    //      <input type="submit" value={"Submit"}  className='  text-xl  text-center bg-green-500 text-white px-2 py-1 cursor-pointer rounded-xl '/>
          
    //      </div>
        
    //      </form>
    //     </div>

            ))
          }
       </div>
   
      
    </>
  )
}

export default AdminVerifyStudent