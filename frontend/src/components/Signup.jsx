import { useState } from 'react'
import libraryImage from '../images/libraryImage.jpg'
import planeimg from '../images/planeimg.png'
import Button from '../resuableComponents/Button'
import Input from '../resuableComponents/Input'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


function Loginpage() {

  const navigate=useNavigate()
  
  const [admin,setAdmin]=useState('')

  const [formdata,setFormdata]=useState({
    name:"",
    email:'',
    number:'',
    branchname:'',
    rollno:"",
    state:'',
    city:'',
    password:"",
    branchId:"",
    adminName:'',
    adminExperience:"",
    adminEmail:"",
    adminNumber:"",
    adminPassword:""
  })

  const [outline,setOutline]=useState('outline-sky-500')

  const [states,setStates]=useState([])
   
  const [branches,setBranches]=useState([])

  useEffect(()=>{
     axios.get('http://localhost:5000/get_branches')
     .then((res)=>{
      const data=res.data.data
      
      setBranches(data)
    
     })
     .catch((err)=>{
      console.log("error in fetching branches ",err)
     })
  },[])

  useEffect(()=>{
     axios.get('http://localhost:5000/get_states')
     .then((res)=>{
      const data=res.data.data
      console.log(data);
      
      setStates(data)
    
     })
     .catch((err)=>{
      console.log("error",err)
     })
  },[])
   
 
//  const emailRegex = /^[A-Za-z0-9]+@gmail\.com$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 const numberRegex=/^\d{10}$/
//  const passwordRegex=/^(?=.*[A-Z])(?=.*\d).{6,}$/
const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;



  const handleChange=(e)=>{
   
    const {name,value}=e.target
    setFormdata({...formdata,[name]:value})
        if(name==="email" || name==="adminEmail"){
      if(!emailRegex.test(value.trim())){
           setOutline('outline-red-500')
      }else{
       setOutline('outline-sky-500')
      }
    }
    if(name==="number" || name==="adminNumber" ){
      if(!numberRegex.test(value.trim())){
       setOutline('outline-red-500')
      }else{
       setOutline('outline-sky-500')
      }
    }
    if(name==="password" || name==="adminPassword"){
      if(!passwordRegex.test(value.trim())){
        setOutline("outline-red-500")
      }else{
        setOutline("outline-sky-500")
      }
    }
 
  }

  const handleSubmit = (e) => {
  e.preventDefault();  // stop auto-submit

  // check empty
  if(admin==="admin"){
    const {adminExperience,adminEmail,adminName,adminNumber,adminPassword}=formdata
    if(!adminEmail || !adminExperience || !adminName || !adminNumber || !adminPassword){
         if (!emailRegex.test(adminEmail)) {
    alert("Invalid Email");
    return;
  }
  if (!numberRegex.test(adminNumber)) {
    alert("Invalid Number");
    return;
  }
  if (!passwordRegex.test(adminPassword)) {
    alert("Invalid Password");
    return;
  }
    }

  }else{
    const {email,name,number,password,city,state,branchname,branchId,rollno}=formdata
     if(!email || !number || !password || !name || !city || !state || !branchname || !branchId || !rollno){
      
  // check regex
  if (!emailRegex.test(email)) {
    alert("Invalid Email");
    return;
  }
  if (!numberRegex.test(number)) {
    alert("Invalid Number");
    return;
  }
  if (!passwordRegex.test(password)) {
    alert("Invalid Password");
    return;
  }
     }
  }


   const finaldata={
    ...formdata,role:admin === "admin" ? "admin" :"student"
   }

 
  axios.post("http://localhost:5000/signup",finaldata)
  .then((res)=>{
    console.log(res.data)
     if (res.data.success) {
      navigate('/');  // 🚀 safe navigation
    } else {
      alert(res.data.message || "Signup failed");
    }
  })
  .catch((err)=>{
    console.log(err,"error in post req")
  })

  // ✅ if everything is valid → submit to backend
  // form.submit();
};

 

  return (
    <>
    <div style={{ backgroundImage: `url(${libraryImage})` }} className='flex justify-center items-center w-full h-[100vh] bg-cover bg-center '>
      <div className=' h-[800px] w-[550px]  rounded-md flex flex-col overflow-hidden bg-white gap-4 '>
       
        <div
        //  style={{ backgroundImage: `url(${planeimg})` }}

          className='w-[100%] h-[21%] bg-gradient-to-tr from-yellow-300  via-orange-400 to-yellow-500'>

          <h1 className='text-center font-bold text-4xl mt-4 text-white '>Signup Page</h1>
          <div className='flex justify-evenly gap-4 mt-7 items-center'>
            <Button value="Login as a Student" 
            className=' text-xl rounded-md border border-white bg-orange-400 text-white hover:scale-105 transition-all duration-300 rounded-md p-2 font-bold inline-block bg-orange-400 cursor-pointer' 
            onClick={()=>{
              setAdmin("student")
              setFormdata({...formdata,name:"", email:'', number:'', branchname:'', rollno:"", state:'', city:'',password:"",branchId:"",})
              }} />
            <Button value="Login as a Admin" className='text-xl rounded-md border border-white bg-orange-400 text-white hover:scale-105 transition-all duration-300 rounded-md p-2 font-bold inline-block bg-orange-400 cursor-pointer '
             onClick={()=>{
              setAdmin("admin")
              setFormdata({...formdata,adminName:'',  adminExperience:"",   adminEmail:"",adminNumber:"", adminPassword:""})
             }} />
          </div>
        </div>
        <div className='w-[100%] h-[79%]  flex flex-col  items-center p-0 m-0' >
           { admin==="admin" ? (
              
           <>
            <form onSubmit={handleSubmit} className='flex flex-col items-center '  >
                <h1 className='text-3xl font-bold mt-0 text-center'>Admin Signup</h1>
               {/* <Input  type="hidden"  name="role" value="admin" /> */}
               <input type="hidden" name="role" value="admin" />
               
               <Input value={formdata.adminName} onChange={handleChange} name="adminName" type="text" placeholder="Enter your name" className="block w-[350px] bg-gray-300 px-5 py-3 mt-5 rounded-3xl outline-sky-500 " />
               <Input value={formdata.adminEmail} onChange={handleChange} name="adminEmail" type="email" placeholder="Enter your email" className={`block w-[350px] bg-gray-300 px-5 py-3 mt-5 rounded-3xl ${outline} `} />
               <Input value={formdata.adminNumber} onChange={handleChange} name="adminNumber" type="text"    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} maxLength='10' placeholder="Enter your phone number" className={`block w-[350px] bg-gray-300 px-5 py-3 mt-5 rounded-3xl  ${outline} `} />
               {/* <Input name="experience" type="text" placeholder="Enter your experience" className="block w-[350px] bg-gray-300 px-5 py-3 mt-5 rounded-3xl outline-sky-500 " /> */}
               <select value={formdata.adminExperience} onChange={handleChange}  name="adminExperience" className="block w-[350px] bg-gray-300 px-5 py-3 mt-5 rounded-3xl outline-sky-500 ">
                  <option value="">Select Experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1+">1+ years</option>
                  <option value="2+">2+ years</option>
                  <option value="3+">3+ years</option>
                  <option value="4+">4+ years</option>
                  <option value="5+">5+ years</option>
               </select>  
               <Input value={formdata.adminPassword} onChange={handleChange} name="adminPassword" type="password" placeholder={"Enter your password"} className={`block w-[350px] bg-gray-300 px-5 py-3 mt-5 rounded-3xl ${outline} `} />
               <Button   type="submit" value="Login" className=' hover:scale-105 transition-all duration-300 bg-blue-500 px-3 py-2 mt-5 rounded-2xl text-white w-[100px] cursor-pointer'  />

               
            </form>
             
              <Link to={"/"} className='text-blue-500 mt-3 text-xl hover:underline-blue-500 cursor-pointer hover:underline underline-offset-2'>Already have an account? </Link>
             
           </>
              
           ) :  
           
           <>
            <form onSubmit={handleSubmit} className='flex flex-col items-center m-0 p-0' >
               <h1 className='text-3xl font-bold  text-center mt-0'>Student Signup</h1>
               {/* <input type="hidden" name="role" value="student" /> */}
               <Input type={"hidden"} name={"role"} value={"student"} />
 
               <Input value={formdata.name} name="name" onChange={handleChange} type="text" placeholder="Enter your name" className="  block w-[350px] bg-gray-300 px-4 py-2 mt-5 rounded-3xl outline-sky-500 " />
               <Input  value={formdata.email} onChange={handleChange} name="email" type="email" placeholder="Enter your email" className={ ` block w-[350px] bg-gray-300 px-4 py-2 mt-3 rounded-3xl   ${outline}`} />
               <Input  value={formdata.number} onChange={handleChange} name="number" type="text"    onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')} maxLength='10' placeholder="Enter your phone number" className={`block w-[350px] bg-gray-300 px-5 py-3 mt-5 rounded-3xl  ${outline} `} />
               
                <select
                 name="branch"
                  value={formdata.branchId}  
                  onChange={(e)=>{
                     const branchId=e.target.value
                    const selectedbranch=branches.find((item)=>item.branchId.toString()===branchId)
                      let branchname=""
                      if(selectedbranch){
                        branchname=selectedbranch.branch_name
                      }
                      setFormdata({...formdata,branchId,branchname})
                    }} 
                  className="block w-[350px] text-gray-500 bg-gray-300 px-4 pr-20 py-2 mt-3 rounded-3xl outline-sky-500">
                   <option value=""  >Select your branch</option>
                   {branches.map((item)=>(
                    <option key={item.branchId} value={item.branchId}>{item.branch_name}</option>
                   ))
                   }
                  
               </select>
               <Input  value={formdata.rollno} onChange={handleChange} name="rollno" type="text" maxLength={10}  onInput={(e)=>{e.target.value=e.target.value.replace(/[^0-9]/g, '')}} placeholder="Enter your rollno " className="  block w-[350px] bg-gray-300 px-4 py-2 mt-5 rounded-3xl outline-sky-500 " />
               
                
                   <select 
                   value={formdata.state}
                   onChange={handleChange}
                  name="state" 
                    className="block w-[350px] text-gray-500 bg-gray-300 px-4 pr-20 py-2 mt-3 rounded-3xl outline-sky-500">
  <option value="">Select your state</option>
       {states.map((item)=>(
         <option key={item.stateId}>{item.state_name}</option>
       ))}
  
</select>

               {/* <Input name="email" type="text" placeholder="Enter your state" className="block w-[350px] bg-gray-300 px-4 py-2 mt-3 rounded-3xl outline-sky-500 " /> */}
               <Input  value={formdata.city} onChange={handleChange}  name="city" type="text" placeholder="Enter your city" className="block w-[350px] bg-gray-300 px-4 py-2 mt-3 rounded-3xl outline-sky-500 " />
               <Input value={formdata.password} onChange={handleChange} name="password" type="password" placeholder={"Enter your password"} className={`block w-[350px] bg-gray-300 px-4 py-2 mt-3 rounded-3xl ${outline}`} />
               <Button  type="submit" value="Signup"  className=' hover:scale-105 transition-all duration-300 bg-blue-500 px-3 py-2 mt-6 rounded-2xl text-white w-[100px] cursor-pointer'/>
              <Link to={"/"} className='text-blue-500 mt-3 text-xl hover:underline-blue-500 cursor-pointer hover:underline underline-offset-2'>Already have an account? </Link>
                             
            </form> 
            
               
             </>
           }
              
        </div>
      
      </div>
    </div>
    </>
  )
}

export default Loginpage


