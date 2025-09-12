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
            alert("slect an option")
            return
        }
        console.log(selectedOption)
         axios.post('http://localhost:5000/bookReturned',{bookingId,selectedOption},{
          headers:{
            Authorization:`Bearer ${token}`
          } 
         })
         .then((res)=>{
            // console.log("res of book_booking",res)
            const booking=bookingStudent.find((item)=>item.bookingId===bookingId)
         if(booking.book_returned===1 && selectedOption==="yes"){
               alert("book alresdy returned")
               return
            }
             if(booking.book_returned===0 && selectedOption==="no"){
               alert("book alresdy not returned")
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
    <h1 className='text-center text-3xl font-bold mt-5'>Book Booking Status</h1>
      <div className='flex flex-wrap justify-center gap-5 pt-10 px-10 pb-10'>
         
          {
            bookingStudent.map((item)=>(

                <table  key={item.bookingId} className='w-[100%] border-black border-1 text-left border-collapse table-fixed' >
                   <thead>
                    <tr className='border-black border-1 '>
                        <th className='border-black border-1 p-2 '>BookingId</th>

                        <th className='border-black border-1 p-2 '>Student name</th>
                        <th className='border-black border-1 p-2 '>Student branch</th>
                        <th className='border-black border-1 text-left p-2'>Book branchId</th>
                        <th className='border-black border-1 text-left p-2'>Booking from date</th>
                        <th className='border-black border-1 text-left p-2'>Booking end date</th>
                        <th className='border-black border-1 text-left p-2'>Booking returned</th>

                        <th className='border-black border-1 text-left p-2'>Book returned</th>
                        {/* <th className='border-black border-1 text-left p-2'>Book returned</th> */}

              

                    </tr>
                    </thead> 
                    <tbody>
                    <tr  className='border-black border-1'>
                        <th className='border-black border-1 p-2 '>{item.bookingId}</th>
                     
                        <td className='border-black border-1 p-2'>{item.student_name}</td>
                        <td className='border-black border-1 p-2'>{item.student_branch}</td>
                           <td className='border-black border-1 p-2'>{item.book_branchId}</td>
                        <td className='border-black border-1 p-2'>{item.booking_fromdate}</td>
                        <td className='border-black border-1 p-2'>{item.booking_enddate}</td>
                        <td className='border-black border-1 p-2'>{item.book_returned}</td>

                       
                        <td className='border-black border-1 p-2'>
                            <div className='flex gap-2 justify-center'> 
                                <button 
                                onClick={()=>onclickHandler("yes",item.bookingId)}
                                className={ ` border-green-500 border-1 px-[10px]  rounded-[5px] cursor-pointer ${bg[item.bookingId]==="yes"?"bg-green-500 text-white":"text-black"}`}>
                                    Yes</button>
                                <button
                                  onClick={()=>onclickHandler("no",item.bookingId)}
                                 className={`border-red-500 border-1 px-[10px] rounded-[5px] cursor-pointer  ${bg[item.bookingId]==="no"?"bg-red-500 text-white":"text-black"} `}>
                                 
                                    No</button>
                            </div>
                            <div className='flex justify-center'>
                                <button 
                                className='cursor-pointer border-black border-1 px-1 mt-2 rounded-[5px]'
                                onClick={()=>onsubmithandler(item.bookingId)}>submit</button>
                            </div>
                        </td>
                        {/* <td className='border-black border-1 p-2'>{returned}</td> */}


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