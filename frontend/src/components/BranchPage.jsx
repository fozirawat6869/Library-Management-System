import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import he from 'he'
import { Link, useNavigate } from 'react-router-dom'
// import { context } from "../App"
// import { useContext } from "react"


function BranchPage() {
  const navigate=useNavigate()
  
  const [branchIcon,setBranchIcon]=useState([])
 
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


   const handleOnclick=(id,name)=>{
      // setBranchId(id)
       navigate(`/books/${id}/${name}`)
   }



  return (
   <div className='bg-blue-900 w-full min-h-screen'>
         <ul className='flex bg-blue-800'>
          <li className='text-white py-3 px-8 hover:bg-blue-700  cursor-pointer text-center font-bold'>Home</li>
          <li className='text-white py-3 px-8 hover:bg-blue-700  cursor-pointer text-center font-bold'>Any</li>
          <li className='text-white py-3 px-8 hover:bg-blue-700  cursor-pointer text-center font-bold'>About</li>
          <li className='text-white py-3 px-8 hover:bg-blue-700  cursor-pointer text-center font-bold'>Contact</li>
          <li className='text-white py-3 px-8 hover:bg-blue-700  cursor-pointer text-center font-bold '>Profile</li>
         </ul>
           
           <div className="flex gap-5 justify-center p-5">
               {branchIcon.map((item)=>(
                <button onClick={()=>handleOnclick(item.branchId,item.branch_name)} className="bg-white rounded-lg cursor-pointer" key={item.branchId}>
                  <div className="text-[100px] text-center w-[160px]" >{he.decode(item.branch_icon)}</div>
                  <p className="text-center  font-bold text-xl pb-1">{item.branch_name}</p>
                </button>
               ))

               }
           </div>

         
   </div>
  )
}

export default BranchPage