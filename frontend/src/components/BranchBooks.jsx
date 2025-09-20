import { useEffect } from "react"
// import { useContext } from "react"
// import { context } from "../App"
import { useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

function BranchBooks() {

  const [books,setBooks]=useState([])
  const [show,setShow]=useState(false)
  const [selectedBook,setSelectedBook]=useState(null)
 const {branchId,branch_name}=useParams()

 const [studentId,setStudentId]=useState('')
 const todaydate=new Date().toISOString().split('T')[0]

 const [dateForm,setDateForm]=useState({ firstdate:"", seconddate:"" })
 const token=localStorage.getItem("token")

 const [page,setPage]=useState(1)
 const limit=2

  useEffect(()=>{
    if(!branchId) return
    axios.get(`http://localhost:5000/branchBook/${branchId}?page=${page}&limit=${limit}`,
       { headers:{ Authorization:`Bearer ${token}` } })
    .then((res)=>{
      setStudentId(res.data.studentId)
      setBooks(res.data.data)
    })
    .catch((err)=>{ console.log(err) })
  },[branchId,token,page,limit])
    

  if(show===true){

     const handleSubmit=(e)=>{
  e.preventDefault()
   if(dateForm.firstdate===''){ alert("enter date in first input"); return }
   if(dateForm.seconddate===""){ alert("type date in second input"); return }
   if (dateForm.firstdate < todaydate) { alert("first date cannot be before today!"); return }
   if(dateForm.seconddate<dateForm.firstdate){ alert("seconddate cannot samller than the firstdate"); return }

  axios.post(`http://localhost:5000/branchBook`,{dateForm,branchId,selectedBook},
     { headers:{ Authorization:`Bearer ${token}` } })
  .then((res)=>{
    if(res.data.message==="success"){
      alert("req submited")
      setShow(false)
    }
  })
  .catch(()=>{ console.log("error in axios post req") })
}

    return (
      <>
        <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-400 via-purple-400 to-blue-200 px-4">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-500 rounded-3xl shadow-2xl w-[420px] h-[500px] flex flex-col p-8 items-center gap-6 border border-purple-300">
            <h1 className="text-3xl font-bold text-white mb-2">
              Book Purchasing Date
            </h1>
            <h1 className="text-white font-semibold text-lg bg-blue-500/20 px-4 py-2 rounded-xl w-[90%]">
              <span className="text-blue-100 font-bold">Student ID:</span> {studentId}
            </h1>
            <h1 className="text-white font-semibold text-lg bg-purple-500/20 px-4 py-2 rounded-xl w-[90%]">
              <span className="text-purple-100 font-bold">Book ID:</span> {selectedBook}
            </h1>
            <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleSubmit} action="">
              <input 
                className="block rounded-lg bg-blue-200/70 p-2 w-[240px] shadow-md focus:ring-2 focus:ring-purple-300 focus:outline-none transition" 
                type="date" 
                min={todaydate} 
                value={dateForm.firstdate} 
                onChange={(e)=>setDateForm({...dateForm,firstdate:e.target.value})}/>
              <input 
                className="block rounded-lg bg-purple-200/70 p-2 w-[240px] shadow-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition" 
                type="date" 
                min={dateForm.firstdate || todaydate}  
                value={dateForm.seconddate} 
                onChange={(e)=>setDateForm({...dateForm,seconddate:e.target.value})} />
              <input 
                className="cursor-pointer block text-white font-bold py-2 px-6 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 shadow-lg hover:scale-105 transform transition duration-300" 
                type="submit" 
                value={"Apply"}  />
            </form>
          </div>
        </div>
      </>
    )
  }else{
    return (
    <>
       <div className='min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-blue-200'>
        <h1 className="text-4xl md:text-5xl font-bold text-center p-6 text-white">
          {branch_name} Branch Books
        </h1>
         <div className="flex justify-center p-8 flex-wrap gap-8">
          {books.map((item)=>(
            <div key={item.bookId}> 
               <button 
               onClick={()=>{
                setShow(true)
                setSelectedBook(item.bookId)
              }} 
               className="cursor-pointer bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transform transition duration-500 border border-purple-300">
                  <div className="w-[200px] h-[250px]">
                    <img src={item.book_image} alt={item.book_name} className="w-full h-full object-cover"/>
                  </div>
                  <p className="w-[200px] text-center font-semibold text-[16px] pt-2 text-white">
                    {item.book_name}
                  </p>
                  <p className="w-[200px] text-center pb-3 text-[15px] font-bold text-purple-100">
                    Quantity: {item.books_quantity}
                  </p>
               </button>
            </div>
         ))}
         </div>

          <div className="flex justify-center text-lg md:text-xl text-white font-bold gap-6 py-6">
            <button
              onClick={()=>{
                if(page===1) return
                setPage(page-1)
              }}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:scale-105 transform transition duration-300 shadow-md text-white">
              Previous
            </button>
            <button 
              onClick={()=>{
                if(page>books.length) return
                setPage(page+1)
              }}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-600 hover:scale-105 transform transition duration-300 shadow-md text-white">
              Next
            </button>
          </div>
      </div>
    </>
  )
  }
}

export default BranchBooks







// import { useEffect } from "react"
// // import { useContext } from "react"
// // import { context } from "../App"
// import { useState } from "react"
// import axios from "axios"
// import { useParams } from "react-router-dom"

// function BranchBooks() {

//   const [books,setBooks]=useState([])

//   const [show,setShow]=useState(false)
//   const [selectedBook,setSelectedBook]=useState(null)
//   // const{branchId}=useContext(context)
//  const {branchId,branch_name}=useParams()

// const [studentId,setStudentId]=useState('')

//  const todaydate=new Date().toISOString().split('T')[0]

// //  const [firstdate,setFirstdate]=useState('')
// //  const [seconddate,setSeconddate]=useState('')
// const [dateForm,setDateForm]=useState({
//                                       firstdate:"",
//                                       seconddate:""
//                                    })

// const token=localStorage.getItem("token")

// const [page,setPage]=useState(1)
// // const [limit,setLimit]=useState(2)
// const limit=2

   


//   useEffect(()=>{
    
//     if(!branchId) return

//     // let catchKey=`catchData_${branchId}_${page}`
//     // let catchData=localStorage.getItem("catchData")
    
//     // if(catchData){
//     //   setBooks(JSON.parse(catchData).data)
//     // }else{

 

//     axios.get(`http://localhost:5000/branchBook/${branchId}?page=${page}&limit=${limit}`,
//        {
//           headers:{
//             Authorization:`Bearer ${token}`
//           }
//         }
//       )
        
     
//     .then((res)=>{
//       setStudentId(res.data.studentId)
//       console.log(res.data)
//        setBooks(res.data.data)
//       // localStorage.setItem("catchData",JSON.stringify(res.data))
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   // }
//   },[branchId,token,page,limit])
    


//   if(show===true){

 
     
//      const handleSubmit=(e)=>{
//   e.preventDefault()
//    if(dateForm.firstdate===''){
//     alert("enter date in first input")
//     return
//    }
//    if(dateForm.seconddate===""){
//     alert("type date in second input")
//     return
//   }
//   if (dateForm.firstdate < todaydate) { // check if typed date is before today
//     alert("first date cannot be before today!");
//     return;
//   }
//   if(dateForm.seconddate<dateForm.firstdate){
//     alert("seconddate cannot samller than the firstdate")
//     return
//   }

//   axios.post(`http://localhost:5000/branchBook`,{dateForm,branchId,selectedBook},
//      {
//           headers:{
//             Authorization:`Bearer ${token}`
//           }
//         }
        
//   )
//   .then((res)=>{
//      console.log(res.data)
    
//      console.log(res.data.studentId)
//     if(res.data.message==="success"){
//     alert("req submited")
//     setShow(false)
//     }
//   })
//   .catch((err)=>{
//      console.log("error in axios post req")
//   })
  
 

// }

    
//     return (
//       <>
//         <div className="w-full min-h-screen bg-blue-900 flex  justify-center items-center">
//           <div className=" bg-blue-800 w-[400px] h-[450px] flex flex-col p-5 items-center gap-5 rounded-xl ">
//             <h1 className="pt-5 text-white font-bold text-3xl underline underline-offset-4">Book purchasing date</h1>
//             <h1 className="text-white font-bold text-3xl pt-5 " >Student id :- {studentId} </h1>
//             <h1 className="text-white font-bold text-3xl" >Book id :- {selectedBook}</h1>
//             <form className="flex flex-col gap-5 " onSubmit={handleSubmit} action="">
//               <input className="block rounded bg-white p-2 w-[200px]" type="date" min={todaydate} value={dateForm.firstdate} onChange={(e)=>setDateForm({...dateForm,firstdate:e.target.value})}/>
//               <input className="block rounded bg-white p-2 w-[200px]" type="date" min={dateForm.firstdate || todaydate}  value={dateForm.seconddate} onChange={(e)=>setDateForm({...dateForm,seconddate:e.target.value})} />
//               <input className="cursor-pointer block text-white font-bold p-1 rounded bg-green-500 text-2xl" type="submit" value={"Apply"}  />
//             </form>
//           </div>
//         </div>
//       </>
//     )
//   }else{
//     return (
//     <>
//        <div className='bg-blue-900 w-full min-h-screen'>
//         <h1 className="text-white text-5xl font-bold text-center p-5 underline  underline-offset-4">{branch_name} branch books</h1>
//          <div className="flex justify-center p-10 flex-wrap gap-8">
//           {books.map((item)=>(
//             <div key={item.bookId} > 

//                <button 
//                onClick={()=>{
//                 setShow(true)
//                 setSelectedBook(item.bookId)
//               }} 
//                className= " cursor-pointer bg-white  rounded-xl overflow-hidden">
//                   <div className="w-[200px] h-[250px] "><img src={item.book_image} alt={item.book_name} className="w-full h-full"/></div>
//                   <p className= "w-[200px] text-center   font-bold text-[15px] pt-1">{item.book_name}</p>
//                   <p className="w-[200px] text-center pb-2 text-[15px] font-bold">Quantity :- {item.books_quantity}</p>

//                </button>
                 
//                 </div>
//          ) )}
//          </div>

//           <div className="flex justify-center text-xl text-white font-bold gap-3 ">
//                     <button
//                      onClick={()=>{
//                         if(page===1) {
//                           return
//                         }
//                          setPage(page-1)
//                     }}>Previous</button>
//                     <button onClick={()=>{
//                       if(page>books.length) return
//                        setPage(page+1)
//                     }}>next</button>
//                   </div>
//       </div>
      
//     </>
//   )
//   }
// }

// export default BranchBooks