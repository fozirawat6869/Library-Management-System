


import React from 'react'
import { useEffect ,useState} from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

function BookingDetails() {

    const navigate=useNavigate()
    const [toggle,setToggle]=useState(true)

    const currentBookFetch=async()=>{
      const token=localStorage.getItem("token")
        const response=await axios.get("http://localhost:5000/bookingDetails?type=current",{
        headers:{
          Authorization:`Bearer ${token}`
        }})
        const data=response.data.data
        return data
    }

    const{data:currentData,isLoading:currentisLoading,error:currentError}=useQuery({
      queryKey:['currentBook'],
      queryFn:currentBookFetch,
      cacheTime:1000*60*5
    })

    const historyBookFetch=async()=>{
      const token=localStorage.getItem("token")
      const response=await axios.get("http://localhost:5000/bookingDetails?type=history",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      const data=response.data.data
      return data
    }

    const {data:historyData,isLoading:historyisLoading,error:historyError}=useQuery({
      queryKey:['historyBook'],
      queryFn:historyBookFetch,
      cacheTime:1000*60*5,
      staleTime:1000*60*5,
      enabled:toggle===false
    })

    if(currentisLoading){
      return <h1 className="text-center mt-10 text-xl font-bold text-blue-600 animate-pulse">Loading...</h1>
    }
    if(currentError){
      return <h1 className="text-center mt-10 text-xl font-bold text-red-600">Something went wrong in current book api fetching</h1>
    }
    if(historyisLoading) return <h1 className="text-center mt-10 text-xl font-bold text-blue-600 animate-pulse">Loading history...</h1>
    if(historyError) return <h1 className="text-center mt-10 text-xl font-bold text-red-600">Something went wrong in history book api fetching</h1>

   function onClickHandler(value){
      if(value===false){
          setToggle(false)
      }
   }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 via-blue-50 to-yellow-50 p-5 md:p-10">
      <div className='flex justify-center mt-2 mb-5'>
        <button onClick={()=>navigate('/studentHomePage')} className='text-xl cursor-pointer px-5 py-2 bg-teal-500 text-white font-bold rounded-full shadow-lg hover:bg-teal-600 transition transform hover:scale-105'>Home page</button>
      </div>

      <div className='flex justify-center gap-5 mt-5 mb-5'>
        <button onClick={()=>onClickHandler(false)} className={`text-xl font-bold px-5 py-2 rounded-full cursor-pointer transition transform hover:scale-105 ${!toggle ? 'bg-yellow-500 text-white shadow-lg' : 'bg-white text-yellow-500 border-2 border-yellow-500 hover:bg-yellow-100'}`}>
          History books of student
        </button>
        <button onClick={()=>setToggle(true)} className={`text-xl font-bold px-5 py-2 rounded-full cursor-pointer transition transform hover:scale-105 ${toggle ? 'bg-blue-500 text-white shadow-lg' : 'bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-100'}`}>
          Current books of student
        </button>
      </div>

      {
        toggle===true? (
          <>
             <h1 className='text-center text-3xl font-extrabold mt-8 pb-5 text-blue-700'>Student Current Bookings</h1>
             {
              (currentData|| []).map((item)=>(
                <div className='flex flex-col justify-center gap-5 mb-5' key={item.bookingId}>
                  <div className='ml-5 mr-5 overflow-x-auto shadow-lg rounded-lg'>
                    <table className='w-full table-fixed text-center border-collapse rounded-lg'>
                      <thead>
                        <tr className='bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 text-white font-bold'>
                          <th className='border p-3'>BookingId</th>
                          <th className='border p-3'>StudentId</th>
                          <th className='border p-3'>Book branchId</th>
                          <th className='border p-3'>BookId</th>
                          <th className='border p-3'>Book returned</th>
                          <th className='border p-3'>Booking from date</th>
                          <th className='border p-3'>Booking end date</th>
                        </tr>
                      </thead>
                      <tbody className='bg-white'>
                        <tr className='hover:bg-green-50 transition'>
                          <td className='border p-2'>{item.bookingId}</td>
                          <td className='border p-2'>{item.studentId}</td>
                          <td className='border p-2'>{item.book_branchId}</td>
                          <td className='border p-2'>{item.bookId}</td>
                          <td className={`border p-2 font-bold ${item.book_returned ? 'text-green-600' : 'text-red-600'}`}>{item.book_returned}</td>
                          <td className='border p-2'>{item.booking_fromdate}</td>
                          <td className='border p-2'>{item.booking_enddate}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
             }
          </>
        ):(
          <>
             <h1 className='text-center text-3xl font-extrabold mt-8 pb-5 text-green-700'>Student History Bookings</h1>
             {
              (historyData || []).map((item)=>(
                <div className='flex flex-col justify-center gap-5 mb-5' key={item.bookingId}>
                  <div className='ml-5 mr-5 overflow-x-auto shadow-lg rounded-lg'>
                    <table className='w-full table-fixed text-center border-collapse rounded-lg'>
                      <thead>
                        <tr className='bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 text-white font-bold'>
                          <th className='border p-3'>BookingId</th>
                          <th className='border p-3'>StudentId</th>
                          <th className='border p-3'>Book branchId</th>
                          <th className='border p-3'>BookId</th>
                          <th className='border p-3'>Book returned</th>
                          <th className='border p-3'>Booking from date</th>
                          <th className='border p-3'>Booking end date</th>
                        </tr>
                      </thead>
                      <tbody className='bg-white'>
                        <tr className='hover:bg-green-50 transition'>
                          <td className='border p-2'>{item.bookingId}</td>
                          <td className='border p-2'>{item.studentId}</td>
                          <td className='border p-2'>{item.book_branchId}</td>
                          <td className='border p-2'>{item.bookId}</td>
                          <td className={`border p-2 font-bold ${item.book_returned ? 'text-green-600' : 'text-red-600'}`}>{item.book_returned}</td>
                          <td className='border p-2'>{item.booking_fromdate}</td>
                          <td className='border p-2'>{item.booking_enddate}</td>
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
    </div>
  )
}

export default BookingDetails





// code without css

// import React from 'react'
// import { useEffect ,useState} from 'react'
// import axios from 'axios'
// import { useQuery } from '@tanstack/react-query'

// function BookingDetails() {

//     // const [bookingData,setBookingData]=useState([])
//     const [toggle,setToggle]=useState(true)
//     // const[bookingHistory,setBookingHistory]=useState([])


//     const currentBookFetch=async()=>{
//       const token=localStorage.getItem("token")
//         const response=await axios.get("http://localhost:5000/bookingDetails?type=current",{
//         headers:{
//           Authorization:`Bearer ${token}`
//         }})
//         const data=response.data.data
//         // setBookingData(data)
//         return data
//     }


//     const{data:currentData,isLoading:currentisLoading,error:currentError}=useQuery({
//       queryKey:['currentBook'],
//       queryFn:currentBookFetch,
//       cacheTime:1000*60*5
//     })
   
 


   
// const historyBookFetch=async()=>{
//   const token=localStorage.getItem("token")
//   const response=await axios.get("http://localhost:5000/bookingDetails?type=history",{
//     headers:{
//       Authorization:`Bearer ${token}`
//     }
//   })
//   const data=response.data.data
//   console.log(data)
//   return data
// }

 

//  const {data:historyData,isLoading:historyisLoading,error:historyError}=useQuery({
//   queryKey:['historyBook'],
//   queryFn:historyBookFetch,
//   cacheTime:1000*60*5,
//   staleTime:1000*60*5,
//   // enabled:false
//    enabled:toggle===false
//  })


//     if(currentisLoading){
//       return <h1>Loading...</h1>
//     }
//     if(currentError){
//       return <h1>Something went wrong in current book api fetching</h1>
//     }
//  if(historyisLoading) return <h1>is loading history ....</h1>
//  if(historyError) return <h1>Something went wrong in history book api fetching</h1>

//    function onClickHandler(value){

//       if(value===false){
//           setToggle(false)
//           // historyBookFetch()
//           // refetchHistory()
//       }
//    }

//   return (


//     <>
//      <div className='flex justify-center mt-3 ' onClick={()=>navigate('/studentHomePage')}>
//              <button className='px-3 py-2 bg-red-500 text-white  w-30 rounded-xl '>Home page</button>
//            </div>
//      <div className='flex justify-center gap-5 mt-5 '>
//      <button 
//      onClick={()=>
//        onClickHandler(false)
//      }
//      className='text-xl font-bold bg-red-500 text-white px-3 py-2 rounded-xl cursor-pointer'>History books of student</button>
//      <button 
//      onClick={()=>{
//         setToggle(true)
//      }}
//      className='text-xl font-bold bg-green-500 text-white px-3 py-2 rounded-xl cursor-pointer'>Current books of student</button>
        
//      </div>
      
//      {
//       toggle===true? (
//         <>
        
       
//            <h1 className='text-center text-2xl font-bold mt-8 pb-5'>Student current books booking  details </h1>
//   {
//         (currentData|| []).map((item)=>(
//           <div className='flex flex-col justify-center gap-5 mb-5 ' key={item.bookingId}>
           
//          <div className='ml-5 mr-5'>
//           <table className='w-full border-2 border-black table-fixed text-center border-collapse'>
//            <tbody >
//              <tr className='border-1 border-black'>
//               <th  className='border-1 border-black p-2' >BookingId</th>

//               <th className='border-1 border-black p-2'>StudentId</th>
//               <th className='border-1 border-black p-2' >Book branchId</th>
//               <th className='border-1 border-black p-2' >BookId</th>
//               <th className='border-1 border-black p-2'>Book returned</th>
//               <th className='border-1 border-black p-2'>Booking from date</th>
//               <th className='border-1 border-black p-2' >Booking end date </th>
               


//               {/* <td>{item.studentId}</td> */}
//              </tr>
//              <tr className='border-1 border-black '>
//               {/* <th  className='border-1 border-black p-2' >BookingId</th> */}
//               <td className='border-1 border-black'>{item.bookingId}</td>
//               <td className='border-1 border-black'>{item.studentId}</td>
//               <td className='border-1 border-black'>{item.book_branchId}</td>
//               <td className='border-1 border-black'>{item.bookId}</td>
//               <td className='border-1 border-black'>{item.book_returned}</td>
//               <td className='border-1 border-black'>{item.booking_fromdate}</td>
//               <td className='border-1 border-black'>{item.booking_enddate}</td>




//               </tr>
             

             
           
//              </tbody>
//           </table>
//           </div >
//            </div>
//         ))
//        }
//         </>
//       ):(
//         <>
           
//              <h1 className='text-center text-2xl font-bold mt-8 pb-5'>Student history books booking  details </h1>
//   {
//         (historyData || []).map((item)=>(
//           <div className='flex flex-col justify-center gap-5 mb-5 ' key={item.bookingId}>
           
//          <div className='ml-5 mr-5'>
//           <table className='w-full border-2 border-black table-fixed text-center border-collapse'>
//            <tbody >
//              <tr className='border-1 border-black'>
//               <th  className='border-1 border-black p-2' >BookingId</th>

//               <th className='border-1 border-black p-2'>StudentId</th>
//               <th className='border-1 border-black p-2' >Book branchId</th>
//               <th className='border-1 border-black p-2' >BookId</th>
//               <th className='border-1 border-black p-2'>Book returned</th>
//               <th className='border-1 border-black p-2'>Booking from date</th>
//               <th className='border-1 border-black p-2' >Booking end date </th>
               


//               {/* <td>{item.studentId}</td> */}
//              </tr>
//              <tr className='border-1 border-black '>
//               {/* <th  className='border-1 border-black p-2' >BookingId</th> */}
//               <td className='border-1 border-black'>{item.bookingId}</td>
//               <td className='border-1 border-black'>{item.studentId}</td>
//               <td className='border-1 border-black'>{item.book_branchId}</td>
//               <td className='border-1 border-black'>{item.bookId}</td>
//               <td className='border-1 border-black'>{item.book_returned}</td>
//               <td className='border-1 border-black'>{item.booking_fromdate}</td>
//               <td className='border-1 border-black'>{item.booking_enddate}</td>




//               </tr>
             

             
           
//              </tbody>
//           </table>
//           </div >
//            </div>
//         ))
//        }
//         </>
//       )
//      }
       
//     </>
//   )
// }

// export default BookingDetails
