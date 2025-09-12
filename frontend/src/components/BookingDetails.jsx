import React from 'react'
import { useEffect ,useState} from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function BookingDetails() {

    // const [bookingData,setBookingData]=useState([])
    const [toggle,setToggle]=useState(true)
    // const[bookingHistory,setBookingHistory]=useState([])


    const currentBookFetch=async()=>{
      const token=localStorage.getItem("token")
        const response=await axios.get("http://localhost:5000/bookingDetails?type=current",{
        headers:{
          Authorization:`Bearer ${token}`
        }})
        const data=response.data.data
        // setBookingData(data)
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
  console.log(data)
  return data
}

 

 const {data:historyData,isLoading:historyisLoading,error:historyError}=useQuery({
  queryKey:['historyBook'],
  queryFn:historyBookFetch,
  cacheTime:1000*60*5,
  staleTime:1000*60*5,
  // enabled:false
   enabled:toggle===false
 })


    if(currentisLoading){
      return <h1>Loading...</h1>
    }
    if(currentError){
      return <h1>Something went wrong in current book api fetching</h1>
    }
 if(historyisLoading) return <h1>is loading history ....</h1>
 if(historyError) return <h1>Something went wrong in history book api fetching</h1>

   function onClickHandler(value){

      if(value===false){
          setToggle(false)
          // historyBookFetch()
          // refetchHistory()
      }
   }

  return (


    <>
    
     <div className='flex justify-center gap-5 mt-5 '>
     <button 
     onClick={()=>
       onClickHandler(false)
     }
     className='text-xl font-bold bg-red-500 text-white px-3 py-2 rounded-xl cursor-pointer'>History books of student</button>
     <button 
     onClick={()=>{
        setToggle(true)
     }}
     className='text-xl font-bold bg-green-500 text-white px-3 py-2 rounded-xl cursor-pointer'>Current books of student</button>
        
     </div>
      
     {
      toggle===true? (
        <>
        
       
           <h1 className='text-center text-2xl font-bold mt-8 pb-5'>Student current books booking  details </h1>
  {
        (currentData|| []).map((item)=>(
          <div className='flex flex-col justify-center gap-5 mb-5 ' key={item.bookingId}>
           
         <div className='ml-5 mr-5'>
          <table className='w-full border-2 border-black table-fixed text-center border-collapse'>
           <tbody >
             <tr className='border-1 border-black'>
              <th  className='border-1 border-black p-2' >BookingId</th>

              <th className='border-1 border-black p-2'>StudentId</th>
              <th className='border-1 border-black p-2' >Book branchId</th>
              <th className='border-1 border-black p-2' >BookId</th>
              <th className='border-1 border-black p-2'>Book returned</th>
              <th className='border-1 border-black p-2'>Booking from date</th>
              <th className='border-1 border-black p-2' >Booking end date </th>
               


              {/* <td>{item.studentId}</td> */}
             </tr>
             <tr className='border-1 border-black '>
              {/* <th  className='border-1 border-black p-2' >BookingId</th> */}
              <td className='border-1 border-black'>{item.bookingId}</td>
              <td className='border-1 border-black'>{item.studentId}</td>
              <td className='border-1 border-black'>{item.book_branchId}</td>
              <td className='border-1 border-black'>{item.bookId}</td>
              <td className='border-1 border-black'>{item.book_returned}</td>
              <td className='border-1 border-black'>{item.booking_fromdate}</td>
              <td className='border-1 border-black'>{item.booking_enddate}</td>




              </tr>
             

             
           
             </tbody>
          </table>
          </div >
           </div>
        ))
       }
        </>
      ):(
        <>
           
             <h1 className='text-center text-2xl font-bold mt-8 pb-5'>Student history books booking  details </h1>
  {
        (historyData || []).map((item)=>(
          <div className='flex flex-col justify-center gap-5 mb-5 ' key={item.bookingId}>
           
         <div className='ml-5 mr-5'>
          <table className='w-full border-2 border-black table-fixed text-center border-collapse'>
           <tbody >
             <tr className='border-1 border-black'>
              <th  className='border-1 border-black p-2' >BookingId</th>

              <th className='border-1 border-black p-2'>StudentId</th>
              <th className='border-1 border-black p-2' >Book branchId</th>
              <th className='border-1 border-black p-2' >BookId</th>
              <th className='border-1 border-black p-2'>Book returned</th>
              <th className='border-1 border-black p-2'>Booking from date</th>
              <th className='border-1 border-black p-2' >Booking end date </th>
               


              {/* <td>{item.studentId}</td> */}
             </tr>
             <tr className='border-1 border-black '>
              {/* <th  className='border-1 border-black p-2' >BookingId</th> */}
              <td className='border-1 border-black'>{item.bookingId}</td>
              <td className='border-1 border-black'>{item.studentId}</td>
              <td className='border-1 border-black'>{item.book_branchId}</td>
              <td className='border-1 border-black'>{item.bookId}</td>
              <td className='border-1 border-black'>{item.book_returned}</td>
              <td className='border-1 border-black'>{item.booking_fromdate}</td>
              <td className='border-1 border-black'>{item.booking_enddate}</td>




              </tr>
             

             
           
             </tbody>
          </table>
          </div >
           </div>
        ))
       }
        </>
      )
     }
       
    </>
  )
}

export default BookingDetails