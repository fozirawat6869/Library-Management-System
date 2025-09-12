// const number=[1,2,3,4,5,6,7,8,9,0]
// // const email=[A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z,a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z,!,@,#,$,%,^,,&,*,-,+,=]

// const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// console.log(Math.floor(Math.random(number)*11))
// const bcrypt=require('bcrypt')
// const planepass='as'
// bcrypt.hash(planepass,10,(err,hash)=>{
//     console.log(hash)
// })
// const pass="$2b$10$vhaiZB9E2r5ImsyiAZtXl.MhLqqCDM3q3ywB2phXabKosOFIET/K6"
// bcrypt.compare(planepass,pass,(err,result)=>{
//     console.log(result)
// })

// const regexemail='^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'

{/* <select
  name="branch"
  value={formdata.branchId}
  onChange={(e) => {
    const { branchId, branchname } = JSON.parse(e.target.value);
    setFormdata({ ...formdata, branchId, branchname });
  }}
  className="block w-[350px] text-gray-500 bg-gray-300 px-4 pr-20 py-2 mt-3 rounded-3xl outline-sky-500"
>
  <option value="">Select your branch</option>
  {branches.map((item) => (
    <option
      key={item.branchId}
      value={JSON.stringify({ branchId: item.branchId, branchname: item.branch_name })}
    >
      {item.branch_name}
    </option>
  ))}
</select> */}

// mathbook imageaddress =https://png.pngtree.com/png-vector/20230330/ourmid/pngtree-thick-green-math-book-vector-design-png-image_6674746.png
// eng imageaddress=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRviwrFbBENAHFasdAaos6n7yQUFLtKlF7Z4Q&s
// science =https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf9fPv0PjZX3rf3WgLaxPAWVacjq2YwXJUWw&s
// hindi=https://c8.alamy.com/comp/HMT95K/hindi-book-with-flag-of-india-and-cd-disk-3d-rendering-isolated-on-HMT95K.jpg
// ss=https://vkpublications.com/cdn/shop/files/9Social-science.jpg?v=1737445564
// const bcrypt=require('bcrypt')
// const planepass='mohitMOHIT123@'
// const hashpass="$2b$10$9PvGoGd7O4GchkwujPpFrOCiUZhyh6cC24660h1OGQktIAqBpr7BC"
//  bcrypt.compare(planepass,hashpass,(err,pass)=>{
//     if(err){
//       console.log("errr in hashing")
//       return
//     }
//             console.log(pass)
           
//           })

// const bcrypt = require('bcrypt');
// const password3="nnnNNN123@"
// // const password3 = 'mmmMMM123@';
// bcrypt.hash(password3,10,(err,hash)=>{
//     console.log("hash mmm :- ",hash)
  
     

//    })

  //  $2b$10$2gQHUqNXgKr3sCf4rakKTOmhuYIkdo5blcFCrypyuTj6XpmjKZudu

// const password2 = 'montyMONTY123@';
// const hash = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnR5QGdtYWlsLmNvbSIsImlhdCI6MTc1NjEyMzAwNH0.V8Nz7rj-6RHPPxFUpUZ-dGuDcMw86RLw4pmtLd_GI_A'
// const hash1="$2b$10$s/EVQJIrJIEingyjwB.fyeAGs6tZC.DFiEL7GMbLHWtTUfBNIfscO"

// const hash2="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ubkBnbWFpbC5jb20iLCJpYXQiOjE3NTYxMjU1MTF9.wp1T9NY-ahxFx_ZB3msenUSRJ3Dt_EuCMRSN9LaqLK0"
// bcrypt.compare(password3, hash2, (err, result) => {
//   console.log(result); // Should be true
// });

const jwt=require("jsonwebtoken")
// const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJudW1iZXIiOiIzMzMzMzMzMzMzIiwiaWF0IjoxNzU2MTQ2MTkwfQ.05U_5GhHTcVQHj9PEW-XATvNXgV6euxtDTvXyDaDdRw"
 const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGl0QGdtYWlsLmNvbSIsImlhdCI6MTc1NjQ2NTQwNH0.4fUY2QJT3IjVk28xZxMGIXB0nw1mhJXo5cGpTACkLMk"
const decoded=jwt.verify(token,"secretKey")
console.log(decoded)