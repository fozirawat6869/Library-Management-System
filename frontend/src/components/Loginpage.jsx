import { useState } from 'react'
import libraryImage from '../images/libraryImage.jpg'
import planeimg from '../images/planeimg.png'
import Button from '../resuableComponents/Button'
import Input from '../resuableComponents/Input'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect } from 'react'
import axios from 'axios'

function Loginpage() {

  const navigate=useNavigate()

  const [admin,setAdmin]=useState('')
  const [formdata,setFormdata]=useState({
    email:'',
    number:'',
    adminpassword:'',
    studentpassword:''
  })

 
const handleOnclick=(e)=>{
  e.preventDefault()
    axios.post('http://localhost:5000/login',formdata, { withCredentials: true })
     .then((res)=>{
    
      
      if(res.data.success){
        const {token,usertype}=res.data
        console.log(res.data)
        localStorage.setItem("token",token)
            
         if(usertype==="student"){
        navigate('/branch')
         }else{
        navigate('/adminProfile')
        }
      
      }

  
     })
       
     .catch((err) => {
        console.log("Axios error:", err);
        alert("Failed to login. Please try again.");
      });
}
  
  const [outline,setOutline]=useState('outline-sky-500')


 const [showpassword,setShowpassword]=useState(false)

  return (
    <>
    <div style={{ backgroundImage: `url(${libraryImage})` }} className='flex justify-center items-center w-full h-[100vh] bg-cover bg-center '>
      <div className=' h-[750px] w-[550px]  rounded-md flex flex-col overflow-hidden bg-white gap-4 '>
       
        <div style={{ backgroundImage: `url(${planeimg})` }} className='w-[100%] h-[40%] '>
          <h1 className='text-center font-bold text-[40px] mt-6  '>Welcome to the website</h1>
          
          <h1 className='text-center font-bold text-4xl mt-6  '>Login Page</h1>
          <div className='flex justify-evenly gap-4 mt-8 items-center'>
            <Button value="Login as a Student" className='text-xl rounded-md border border-black rounded-md p-2 font-bold inline-block bg-orange-400 cursor-pointer' onClick={()=>{
                                                                                                                                                                                    setAdmin("student") 
                                                                                                                                                                                    setFormdata({...formdata,number:"",email:'',password:""})} }
                                                                                                                                                                                    />
            <Button value="Login as a Admin" className='text-xl rounded-md border border-black rounded-md p-2 font-bold inline-block bg-orange-400 cursor-pointer ' onClick={()=>{
                                                                                                                                                                                    setAdmin("admin") 
                                                                                                                                                                                    setFormdata({...formdata,number:"",email:'',password:""})} }
                                                                                                                                                                                    />
          </div>
        </div>
        <div className='w-[100%] h-[60%]  flex flex-col justify-center items-center p-0 m-0' >
           { admin==="admin" ? (
              
           <>
            <form onSubmit={handleOnclick} className='flex flex-col items-center '  >
                <h1 className='text-3xl font-bold mt-0 text-center'>Admin Login</h1>
              
                <div className='relative w-[350px]   '>
                <span className='text-xl absolute left-2 top-1/2 '>👤</span>
               <Input value={formdata.email} onChange={(e)=>setFormdata({...formdata,email:e.target.value})} name="email"  type="email"    placeholder="Enter your phone emial" className={`block w-[350px] bg-gray-300 px-10 py-3 mt-8 rounded-3xl ${outline} `} />
                </div>
              
               <div className='relative w-[350px]   '>
                <span className='text-xl absolute left-2 top-1/2 '>&#128274;</span>
                 <Input value={formdata.adminpassword} onChange={(e)=>setFormdata({...formdata,adminpassword:e.target.value})} name="adminpassword" type={showpassword?"text":"password"} placeholder={"Enter your password"}  className="block w-[350px] bg-gray-300 px-10 py-3 mt-8 rounded-3xl outline-sky-500 " />
                <span onClick={()=>{setShowpassword(!showpassword)}} className=' cursor-pointer absolute text-xl right-3 top-1/2 '>
                 {showpassword ? <FaEyeSlash className='mt-[5px]' size={20} /> : <FaEye className='mt-[5px]' size={20} />}
                  {/* {showpassword ? "🙈" : "👁"} */}
                  {/* {showpassword? < IoEye/>:<IoMdEyeOff />} */}
                </span>
               </div>
               <Button   type="submit" value="Login" className='bg-blue-500 px-3 py-2 mt-6 rounded-2xl text-white w-[100px] cursor-pointer'  />
               <h1 className='text-blue-500 mt-5 hover:underline-blue-500 cursor-pointer hover:underline underline-offset-2'>Forgetten password? </h1>
               <hr className="w-full border-gray-400 my-5" />
             </form>
             
             <Link className='bg-green-500 px-3 py-2 mt-2 rounded-2xl text-center text-white w-[200px] cursor-pointer' to={"/signup"} >Create new acccount</Link>
           </>
              
           ) :  
           
           <>
            <form onSubmit={handleOnclick} className='flex flex-col items-center m-0 p-0' >
               <h1 className='text-3xl font-bold  text-center'>Student Login</h1>
               <div className='relative w-[350px]   '>
                <span className='text-xl absolute left-2 top-1/2 '>👤</span>
                
               <Input value={formdata.number} onChange={(e)=>setFormdata({...formdata,number:e.target.value})} name="number"  type="text"    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} maxLength='10' placeholder="Enter your phone number" className={`block w-[350px] bg-gray-300 px-10 py-3 mt-8 rounded-3xl ${outline}`} />
                </div>
              
               <div className='relative w-[350px]   '>
                <span className='text-xl absolute left-2 top-1/2 '>&#128274;</span>
                 <Input value={formdata.studentpassword} onChange={(e)=>setFormdata({...formdata,studentpassword:e.target.value})} name="studentpassword" type={showpassword?"text":"password"} placeholder={"Enter your password"} className="block w-[350px] bg-gray-300 px-10 py-3 mt-8 rounded-3xl outline-sky-500" />
                <span onClick={()=>{setShowpassword(!showpassword)}} className=' cursor-pointer absolute text-xl right-3 top-1/2 '>
                 {showpassword ? <FaEyeSlash  className='mt-[5px]'size={20} /> : <FaEye  className='mt-[5px]'size={20} />}
                  {/* {showpassword ? "🙈" : "👁"} */}
                </span>
               </div>
              
               <Button  type="submit" value="Login"  className='bg-blue-500 px-3 py-2 mt-6 rounded-2xl text-white w-[100px] cursor-pointer'/>               
               <h1 className='text-blue-500 mt-5 hover:underline-blue-500 cursor-pointer hover:underline underline-offset-2'>Forgetten password? </h1>
                <hr className="w-full border-gray-400 my-5" />
                             
            </form> 
            
                 <Link className='bg-green-500 text-center px-3 py-2  mt-2 rounded-2xl text-white w-[200px] cursor-pointer' to={"/signup"} >Create new acccount</Link>
             </>
           }
              
        </div>
      
      </div>
    </div>
    </>
  )
}

export default Loginpage
