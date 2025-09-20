
import './App.css'
import 'react-router-dom'
import Loginpage from './components/Loginpage'
import Signup from './components/Signup'
import { BrowserRouter, Routes ,Route} from 'react-router-dom'
// import BranchPage from './components/BranchPage'
import BranchBooks from './components/branchBooks'
import AdminProfile from './components/AdminProfile'
import AdminVerifyStudent from './components/AdminVerifyStudent'
import BookingStatus from './components/BookingStatus'
import StudentHomePage from './components/StudentHomePage.jsx'
import StudentProfile from './components/StudentProfile'
import EditStudentProfile from './components/EditStudentProfile.jsx'
import BookingDetails from './components/BookingDetails.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import StudentOutletWrapper from './components/StudentOutletWrapper.jsx'

// import { useContext } from 'react'
// import { createContext } from 'react'
// import { useState } from 'react'

// export const context=createContext()

const queryClient=new QueryClient()

function App() {

// const [branchId,setBranchId]=useState("")


  return (
    <>
  {/* <context.Provider value={{branchId,setBranchId}}> */}
     <QueryClientProvider client={queryClient}>
           <BrowserRouter>
      <Routes>
        <Route index element={<Loginpage/>} />
        <Route path='/signup' element={<Signup/>} />
        {/* <Route path='/branch' element={<BranchPage/>} /> */}
        <Route path={'/books/:branchId/:branch_name'} element={<BranchBooks/>} />
         <Route path='/adminProfile' element={<AdminProfile/>} />
         <Route  path='/verifyStudent' element={<AdminVerifyStudent/>} />
         <Route  path='/bookingStatus' element={<BookingStatus/>} />
         <Route  path='/studentHomePage' element={<StudentHomePage/>} />
         <Route  path='/studentProfile' element={<StudentProfile/>} />
         <Route path='/editStudentProfile' element={<EditStudentProfile/>} />
         <Route  path='/bookingDetails' element={<BookingDetails/>} />

        
      </Routes>
    </BrowserRouter>
     </QueryClientProvider>
  {/* </context.Provider> */}
  
    </>
  )
}

export default App
