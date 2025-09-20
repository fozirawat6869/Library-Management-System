// // StudentLayout.jsx
// import React, { useEffect, useState } from "react";
// import { Outlet, useNavigate } from "react-router-dom";
// import axios from "axios";
// import bgimage from "../images/libraryimage.jpg";
// import he from "he";

// function StudentLayout() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   const [studentData, setStudentData] = useState([]);
//   const [branchIcon, setBranchIcon] = useState([]);

//   // Fetch student info
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/loginStudentDetail", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setStudentData(res.data.data))
//       .catch((err) => console.error(err));
//   }, [token]);

//   // Fetch branch icons
//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/branchIcons", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setBranchIcon(res.data.data))
//       .catch((err) => console.error(err));
//   }, [token]);

//   const handleBranchClick = (id, name) => {
//     navigate(`/books/${id}/${name}`);
//   };

//   return (
//     <div
//       style={{
//         backgroundImage: `url(${bgimage})`,
//         backgroundSize: "cover",
//         backgroundRepeat: "no-repeat",
//         backgroundAttachment: "fixed",
//       }}
//       className="bg-cover w-full min-h-screen text-center"
//     >
//       {/* Navbar */}
//       {studentData.length > 0 && (
//         <div className="flex gap-5 justify-around bg-orange-900 px-4 py-4 items-center">
//           <div
//             className="text-white font-bold text-l cursor-pointer"
//             onClick={() => navigate("/studentHomePage")}
//           >
//             Home
//           </div>
//           <div
//             className="cursor-pointer text-white font-bold text-l"
//             onClick={() => navigate("/bookingDetails")}
//           >
//             Booking Details
//           </div>
//           <div
//             className="cursor-pointer text-white font-bold text-l flex"
//             onClick={() => navigate("/studentProfile")}
//           >
//             <div className="flex items-center gap-3">
//               <span className="flex justify-center border-1 border-white rounded-full p-1">
//                 <i className="fas fa-user"></i>
//               </span>
//               <div className="flex flex-col">
//                 <div>Profile</div>
//                 <div>{studentData[0].student_name}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Branch icons */}
//       <div className="flex gap-5 justify-center p-5">
//         {branchIcon.map((item) => (
//           <button
//             key={item.branchId}
//             onClick={() => handleBranchClick(item.branchId, item.branch_name)}
//             className="bg-white rounded-lg cursor-pointer"
//           >
//             <div className="text-[100px] text-center w-[160px]">
//               {he.decode(item.branch_icon)}
//             </div>
//             <p className="text-center font-bold text-xl pb-1">
//               {item.branch_name}
//             </p>
//           </button>
//         ))}
//       </div>

//       {/* Page content */}
//       <div className="p-5">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

// export default StudentLayout;
