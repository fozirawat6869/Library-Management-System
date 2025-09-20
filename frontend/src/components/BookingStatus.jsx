import React from 'react'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import { use } from 'react'

function BookingStatus() {
    const token=localStorage.getItem('token')
    const [bookingStudent,setBookingStudent]=useState([])
    const [bg,setBg]=useState({})
   const fetchFunction=()=>{
        axios.get("http://localhost:5000/books_booking",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then((res)=>{
        console.log(res.data)
        setBookingStudent(res.data.data)
      })
         .catch((err)=>{
      console.log("error in fetching booking student details ",err)
    })
     }
     useEffect(()=>{
      fetchFunction()
     },[])
    

    function onclickHandler(option,bookingId){
         setBg((prev)=>{
            const newBg={...prev}

            if(newBg[bookingId]===option){
                delete newBg[bookingId]
            }else{
                newBg[bookingId]=option
            }
                return newBg
            
         })
    }
    function onsubmithandler(bookingId){

        const selectedOption=bg[bookingId]
        if(!selectedOption){
            alert("select an option")
            return
        }
        console.log(selectedOption)
         axios.post('http://localhost:5000/bookReturned',{bookingId,selectedOption},{
          headers:{
            Authorization:`Bearer ${token}`
          } 
         })
         .then((res)=>{
            const booking=bookingStudent.find((item)=>item.bookingId===bookingId)
         if(booking.book_returned===1 && selectedOption==="yes"){
               alert("book already returned")
               return
            }
             if(booking.book_returned===0 && selectedOption==="no"){
               alert("book already not returned")
               return
            }

            if(res.data.message==="returned"){
                alert("book returned to student")
                fetchFunction()
                return
            }
            if(res.data.message==="not returned"){
                alert("book not returned to student")
                fetchFunction()
                return
            }
         
         })
         .catch((err)=>{
            console.log("error in book_booking",err)
         })
    }
  return (
    <>
    <div className='flex justify-center mt-5 '>
      <h1 onClick={()=>navigate("/adminProfile")} className='cursor-pointer font-bold text-white bg-purple-500 text-xl w-35 px-3 py-2 rounded-xl text-center'>Go home</h1>
    </div>
    <h1 className='text-center text-4xl font-extrabold mt-8 text-purple-700 '>Book Booking Status</h1>
      <div className='flex flex-col gap-8 pt-10 px-5 md:px-10 pb-10'>
         
          {
            bookingStudent.map((item)=>(
                <table  key={item.bookingId} className='w-full md:w-[95%] mx-auto border border-gray-300 rounded-xl shadow-lg overflow-hidden bg-white'>
                   <thead className='bg-indigo-100'>
                    <tr>
                        <th className='p-3 border-b border-gray-300 text-left text-purple-700 font-semibold'>BookingId</th>
                        <th className='p-3 border-b border-gray-300 text-left text-purple-700 font-semibold'>Student name</th>
                        <th className='p-3 border-b border-gray-300 text-left text-purple-700 font-semibold'>Student branch</th>
                        <th className='p-3 border-b border-gray-300 text-left text-purple-700 font-semibold'>Book branchId</th>
                        <th className='p-3 border-b border-gray-300 text-left text-purple-700 font-semibold'>Booking from date</th>
                        <th className='p-3 border-b border-gray-300 text-left text-purple-700 font-semibold'>Booking end date</th>
                        <th className='p-3 border-b border-gray-300 text-left text-purple-700 font-semibold'>Booking returned</th>
                        <th className='p-3 border-b border-gray-300 text-left text-purple-700 font-semibold'>Book returned</th>
                    </tr>
                    </thead> 
                    <tbody>
                    <tr className='hover:bg-purple-50 transition-colors'>
                        <td className='p-3 border-b border-gray-200'>{item.bookingId}</td>
                        <td className='p-3 border-b border-gray-200'>{item.student_name}</td>
                        <td className='p-3 border-b border-gray-200'>{item.student_branch}</td>
                        <td className='p-3 border-b border-gray-200'>{item.book_branchId}</td>
                        <td className='p-3 border-b border-gray-200'>{item.booking_fromdate}</td>
                        <td className='p-3 border-b border-gray-200'>{item.booking_enddate}</td>
                        <td className='p-3 border-b border-gray-200'>{item.book_returned}</td>
                        <td className='p-3 border-b border-gray-200'>
                            <div className='flex gap-2 justify-center mb-2'> 
                                <button 
                                onClick={()=>onclickHandler("yes",item.bookingId)}
                                className={`px-3 py-1 rounded-md text-sm font-semibold border border-green-500 transition duration-300 ${bg[item.bookingId]==="yes"?"bg-green-500 text-white":"text-green-500 hover:bg-green-100"}`}>
                                    Yes
                                </button>
                                <button
                                  onClick={()=>onclickHandler("no",item.bookingId)}
                                 className={`px-3 py-1 rounded-md text-sm font-semibold border border-red-500 transition duration-300 ${bg[item.bookingId]==="no"?"bg-red-500 text-white":"text-red-500 hover:bg-red-100"}`}>
                                    No
                                </button>
                            </div>
                            <div className='flex justify-center'>
                                <button 
                                className='px-4 py-1 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md shadow-md transition duration-300'
                                onClick={()=>onsubmithandler(item.bookingId)}>Submit</button>
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

export default BookingStatus





// import React from 'react'
// import { useState ,useEffect} from 'react'
// import axios from 'axios'
// import { use } from 'react'

// function BookingStatus() {
//     const token=localStorage.getItem('token')
//     const [bookingStudent,setBookingStudent]=useState([])
//     const [bg,setBg]=useState({})
//    const fetchFunction=()=>{
//         axios.get("http://localhost:5000/books_booking",{
//         headers:{
//           Authorization:`Bearer ${token}`
//         }
//       })
//       .then((res)=>{
//         console.log(res.data)
//         setBookingStudent(res.data.data)
//       })
//          .catch((err)=>{
//       console.log("error in fetching booking student details ",err)
//     })
//      }
//      useEffect(()=>{
//       fetchFunction()
//      },[])
    

//     function onclickHandler(option,bookingId){
//          setBg((prev)=>{
//             const newBg={...prev}

//             if(newBg[bookingId]===option){
//                 delete newBg[bookingId]
//             }else{
//                 newBg[bookingId]=option
//             }
//                 return newBg
            
//          })
//     }
//     function onsubmithandler(bookingId){

//         const selectedOption=bg[bookingId]
//         if(!selectedOption){
//             alert("slect an option")
//             return
//         }
//         console.log(selectedOption)
//          axios.post('http://localhost:5000/bookReturned',{bookingId,selectedOption},{
//           headers:{
//             Authorization:`Bearer ${token}`
//           } 
//          })
//          .then((res)=>{
//             // console.log("res of book_booking",res)
//             const booking=bookingStudent.find((item)=>item.bookingId===bookingId)
//          if(booking.book_returned===1 && selectedOption==="yes"){
//                alert("book alresdy returned")
//                return
//             }
//              if(booking.book_returned===0 && selectedOption==="no"){
//                alert("book alresdy not returned")
//                return
//             }

//             if(res.data.message==="returned"){
              
//                 alert("book returned to student")

//                fetchFunction()
              
//                 return
//             }
//             if(res.data.message==="not returned"){
//                 alert("book not returned to student")
//                 fetchFunction()
//                 return
//             }
         
//          })
//          .catch((err)=>{
//             console.log("error in book_booking",err)
//          })
//     }
//   return (
//     <>
//     <h1 className='text-center text-3xl font-bold mt-5'>Book Booking Status</h1>
//       <div className='flex flex-wrap justify-center gap-5 pt-10 px-10 pb-10'>
         
//           {
//             bookingStudent.map((item)=>(

//                 <table  key={item.bookingId} className='w-[100%] border-black border-1 text-left border-collapse table-fixed' >
//                    <thead>
//                     <tr className='border-black border-1 '>
//                         <th className='border-black border-1 p-2 '>BookingId</th>

//                         <th className='border-black border-1 p-2 '>Student name</th>
//                         <th className='border-black border-1 p-2 '>Student branch</th>
//                         <th className='border-black border-1 text-left p-2'>Book branchId</th>
//                         <th className='border-black border-1 text-left p-2'>Booking from date</th>
//                         <th className='border-black border-1 text-left p-2'>Booking end date</th>
//                         <th className='border-black border-1 text-left p-2'>Booking returned</th>

//                         <th className='border-black border-1 text-left p-2'>Book returned</th>
//                         {/* <th className='border-black border-1 text-left p-2'>Book returned</th> */}

              

//                     </tr>
//                     </thead> 
//                     <tbody>
//                     <tr  className='border-black border-1'>
//                         <th className='border-black border-1 p-2 '>{item.bookingId}</th>
                     
//                         <td className='border-black border-1 p-2'>{item.student_name}</td>
//                         <td className='border-black border-1 p-2'>{item.student_branch}</td>
//                            <td className='border-black border-1 p-2'>{item.book_branchId}</td>
//                         <td className='border-black border-1 p-2'>{item.booking_fromdate}</td>
//                         <td className='border-black border-1 p-2'>{item.booking_enddate}</td>
//                         <td className='border-black border-1 p-2'>{item.book_returned}</td>

                       
//                         <td className='border-black border-1 p-2'>
//                             <div className='flex gap-2 justify-center'> 
//                                 <button 
//                                 onClick={()=>onclickHandler("yes",item.bookingId)}
//                                 className={ ` border-green-500 border-1 px-[10px]  rounded-[5px] cursor-pointer ${bg[item.bookingId]==="yes"?"bg-green-500 text-white":"text-black"}`}>
//                                     Yes</button>
//                                 <button
//                                   onClick={()=>onclickHandler("no",item.bookingId)}
//                                  className={`border-red-500 border-1 px-[10px] rounded-[5px] cursor-pointer  ${bg[item.bookingId]==="no"?"bg-red-500 text-white":"text-black"} `}>
                                 
//                                     No</button>
//                             </div>
//                             <div className='flex justify-center'>
//                                 <button 
//                                 className='cursor-pointer border-black border-1 px-1 mt-2 rounded-[5px]'
//                                 onClick={()=>onsubmithandler(item.bookingId)}>submit</button>
//                             </div>
//                         </td>
//                         {/* <td className='border-black border-1 p-2'>{returned}</td> */}


//                     </tr>
//                     </tbody>
//                 </table>
  

//             ))
//           }
//        </div>
//     </>
//   )
// }

// export default BookingStatus