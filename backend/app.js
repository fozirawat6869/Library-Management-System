const express=require('express')
const cors=require('cors')
const app=express();
const connection=require('./db')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
// import getStandardResponse from './common/common.js';
const getStandardResponse=require('./common/common')
const cookieParser=require('cookie-parser')


app.use(cors({origin:"http://localhost:5173",
              methods:['GET','POST','PUT','DELETE'],
              credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


function protectedRoute(req,res,next){
  console.log(req.body)
  const auth=req.headers.authorization
   if(!auth){
    console.log("authorization required")
  }
   

   const token=auth.split(' ')[1]
   console.log(token)
   if(!token){
    console.log("token is required")
    return
   }


 
   console.log(token)
   jwt.verify(token,"secretKey",(err,studentverifyToken)=>{
    if(err){
      console.log("err in verifying the token of student")
    }else{
      req.user=studentverifyToken
      console.log(studentverifyToken)
      next()
    }})

      jwt.verify(token,"secretAdmin",(err,adminverifyToken)=>{
    if(err){
      console.log("err in verifying the token of admin")
    }else{
      req.user=adminverifyToken
      console.log(adminverifyToken)
      next()
    }
    
    
   })
}

app.get('/',(req,res)=>{
    res.send("Hlo backend")
})

app.post('/login',(req,res)=>{
   console.log(req.body)
   const {email,number,adminpassword,studentpassword}=req.body
   let query=''
   let values=''
   let usertype=""

   if(number){
    query="select * from student_details where student_phone=?"
    values=[number]
    usertype="student"
   }else{
    query="select * from librarian_details where librarian_email=?"
    values=[email]
    usertype="admin"
   }
    // const values=email ? [email] : [number]
    
   connection.query(query,values,(err,result)=>{
        console.log(result)
        if(result.length===0){
            console.log("user not found")
            // res.redirect('http://localhost:5173/signup')
            return res.send({message:"worng email"})
           }else{
       
        const planepass = number ? studentpassword : adminpassword;
        // String(password).trim() // for if user add space between name
        console.log(planepass)
      
         const hashpass = number ? result[0].student_password : result[0].librarian_password;
             console.log(hashpass) 
         bcrypt.compare(planepass,hashpass,(err,pass)=>{
            console.log("decrypt hash pass:- ",pass)
            if(err){
                console.log("error in hashing ")
                return
            }
            if(!pass){
              console.log('password is wrong')
             return res.send({message:"wrongPassword"})
            }
          
            if(usertype==="student"){
                 console.log(pass);
               const token= jwt.sign({number:req.body.number},'secretKey')
                  console.log("token on console :- ",token)
              // res.cookie('student token :- ',token )  
              
               return res.json({ success: true, message: "login student successful",token,usertype});
            
            }
            // else{
            //   return res.json(getStandardResponse(false,"login failed of student"))
            // } 
             if(usertype==="admin"){
              const token=jwt.sign({email:req.body.email},'secretAdmin')
              console.log("admin token :- ", token)
              // res.cookie("token",token)
           
               return res.json({ success: true, message: "login admin successful",token,usertype});

            }
            // else{
            //   return res.json(getStandardResponse(false,"login failed of admin"))
              
            // }

          }) }

      }) 
   
})


app.post('/signup',(req,res)=>{
 
   
   const {role,adminPassword,password}=req.body
   let query=''
   let values=[]
   let plainnpass=""
   if(role==="student"){
   
     const {name,email,number,rollno,city,state,branchId,branchname}=req.body
      query="Insert Into student_details(student_name,student_email,student_phone,student_branch,student_branchId,student_rollno,student_city,student_state,student_password) values(?,?,?,?,?,?,?,?,?)"
      values=[name,email,number,branchname,branchId,rollno,city,state]
      plainnpass=password
    }else{
      const{adminName,adminEmail,adminNumber,adminExperience}=req.body
     query="insert into librarian_details(librarian_name,librarian_email,librarian_phone,librarian_experience,librarian_password) values(?,?,?,?,?)"
     values=[adminName,adminEmail,adminNumber,adminExperience  ]
     plainnpass=adminPassword
    }
    
   bcrypt.hash(plainnpass,10,(err,hash)=>{
    console.log(hash)
    values.push(hash)
     connection.query(query,values,(err,result)=>{
       console.log("hash pass:-",result)
        if(err){
            console.log(err)
            return
        }else{
          // res.redirect("http://localhost:5173")
        return res.json({ success: true, message: "Signup successful" });

        }
      //   else{
         
          
      //  const token= jwt.sign({email:req.body.email},'secretKey')
      //   console.log(token)
      //   res.cookie('token',token)
       
      //   // res.redirect("http://localhost:5173")
      //   return res.json({ success: true, message: "Signup successful" ,token:token});
      //   }
     })

   })
})
  

app.get('/get_branches',(req,res)=>{

  let query = 'Select * From branches'
  connection.query(query,(err,result)=>{

// res.json({'status' : 200,'message' : 'Success','branches':result})

    if(err) {
      res.json(getStandardResponse(400,'not success',result))
    } else {
      
      res.json(getStandardResponse(200,'Success',result))
      // res.json({'status' : 200,'message' : 'Success','branches':result})
    }

  })

})

app.get('/get_states',(req,res)=>{
  const query ="select * from states"
  connection.query(query,(err,result)=>{
   
    if(err){
      res.json(400,"not success",result)
    }else{
      res.json(getStandardResponse(200,'success',result))
    }
  })
})

app.get('/branchIcons',protectedRoute,(req,res)=>{
 
  console.log(req.headers.Authorization)

  connection.query('select * from branches',(err,result)=>{
    if(err){
      res.json(getStandardResponse(400,"not success",result))
      return
    }else{
     res.json(getStandardResponse(200,"success",result))
    }
  })
})


app.get('/branchBook/:branchId',protectedRoute,(req,res)=>{
  //  console.log(req.cookies.token)
 console.log(req.query)
//  const{page,limit}=req.query
  let page = parseInt(req.query.page) || 1;   // if no page given, use 1
  let limit = parseInt(req.query.limit) || 2; // if no limit given, use 2
   let offset = (page - 1) * limit;


 const {number}=req.user
 
  connection.query('select * from student_details where student_phone=?',[number],(err,result)=>{
    //  console.log(result)
    if(result.length===0){
      console.log("no student found")
      return
    }
    const studentId=result[0].studentId
    console.log(studentId)

     const branchId=parseInt(req.params.branchId)
 
   connection.query(`select * from books_table where book_branchId=? limit ${limit} offset ${offset} `,[branchId],(err,result)=>{
     console.log(result)
     if(err){
      
      res.json(getStandardResponse(400,"not success",result))
     }else{
      res.json({...getStandardResponse(200,'success',result),studentId:studentId})
     }
   })
  })

})

app.post('/branchBook',protectedRoute,(req,res)=>{
   console.log(req.body)
     const{dateForm:{firstdate,seconddate},branchId,selectedBook}=req.body
  //  console.log("token on brabchBook :- ",req.cookies.token)
  // const token=req.cookies.token

  // const student=jwt.verify(token,'secretKey')
  const {number}=req.user
 
 
  connection.query('select * from student_details where student_phone=?',[number],(err,result)=>{
    //  console.log(result)
    if(result.length===0){
      console.log("no student found")
      return
    }
    const studentId=result[0].studentId

  connection.query("insert into books_booking(studentId,booking_fromdate,booking_enddate,book_branchId,bookId) values(?,?,?,?,?)",[studentId,firstdate,seconddate,branchId,selectedBook],(err,data)=>{
    
    console.log(data)
    if(err){
      console.log("error in inserting data in table")
    }
     res.json({...getStandardResponse(200,"success",data),studentId:studentId})
  })
  })
   
})

app.get('/studentDetails',protectedRoute,(req,res)=>{
 
        connection.query("select * from student_details",(err,result)=>{
        //  select * from student_details,books_booking where student_details.studentId=books_booking.studentId
          console.log(result)
         res.json(getStandardResponse(200,"success student api",result))
        })
})

app.post('/activeOrdeactive',protectedRoute,(req,res)=>{
  console.log("hloooo :- ",req.body)
  const {studentId,status}=req.body
  const isActive=status==="active"?1:0
 
  connection.query("update student_details set isActive=? where studentId=?",[isActive,studentId],(err,result)=>{
    console.log(result)
    if(err){
      console.log("error in query",err)
    }else{
      const message=isActive?"activated":"deactivated"
      res.json(getStandardResponse(200,message,result))
    }
  })
})

app.get('/books_booking',protectedRoute,(req,res)=>{
    connection.query("select * from student_details , books_booking where student_details.studentId=books_booking.studentId",(err,result)=>{
          if(err){
      console.log("error in query",err)
    }else{
      res.json(getStandardResponse(200,"success booking book api",result))
    }
    })
})

app.post('/bookReturned',protectedRoute,(req,res)=>{
   console.log(req.body)
   const{bookingId,selectedOption}=req.body
   const option=selectedOption==="yes"?1:0

  //  const query="update books_booking a join books_table b on a.bookId=b.bookId set a.book_returned=?,b.books_quantity=b.books_quantity-1 where a.bookingId=?"
   const optionQuery=option?"update books_booking a join books_table b on a.bookId=b.bookId set a.book_returned=?,b.books_quantity=b.books_quantity-1 where a.bookingId=?":"update books_booking a join books_table b on a.bookId=b.bookId set a.book_returned=?,b.books_quantity=b.books_quantity+1 where a.bookingId=?"
   connection.query(optionQuery,[option,bookingId],(err,result)=>{
     console.log("update of book",result)
     if(err){
      console.log("err in bookReturned query")
      return
     }else{
      const message=option?"returned":"not returned"
      res.json(getStandardResponse(200,message,result))
     }

   })
})

app.get('/loginStudentDetail',protectedRoute,(req,res)=>{
  console.log("token on loginStudent :- ",req.headers.authorization)
  const {number}=req.user
  console.log("number from token :- ",number)
  // const token=req.cookies.token
  connection.query("select * from student_details where student_phone=?",[number] ,(err,result)=>{
    if(err){
      console.log("error in loginStudent api")
      res.json(getStandardResponse(400,"not success",result))
    }else{
      res.json(getStandardResponse(200,"success loginStudent api",result))
    }
})
})

app.get('/bookingDetails',protectedRoute,(req,res)=>{
  const {number}=req.user
  const {type}=req.query
  connection.query("select * from student_details where student_phone=?", [number], (err, result) => {
    console.log(result)

    if (err) {
      console.log("error in bookingDetails api")
    }else{
      const studentId=result[0].studentId
      let query=''
      
         if(type==="current"){
      query="select * from books_booking where studentId=? and book_returned=1" 
           connection.query(query,[studentId],(err,bookingresult)=>{
        if(err){
          console.log("error in bookingDetails query")
          return
        }else{
          res.json(getStandardResponse(200,"success bookingDetails api",bookingresult))
        }
      })
      }else if(type==="history"){
        const today=new Date().toISOString().split('T')[0]
        console.log(today)
      query="select * from books_booking where studentId=? and book_returned=0"
        connection.query(query,[studentId],(err,resulthistory)=>{
        if(err){
          console.log("error in bookingDetails history query")
        }else{
          res.json(getStandardResponse(200,"success history bookingDetails api",resulthistory))
        }
      })
      // query="update "
          // res.json(getStandardResponse(200,"success hsitory bookingDetails api",resulthistory))
      }else{
         res.json(getStandardResponse(400,"invalid type",[]))
      }
      
    }
  })
})



app.listen(5000,()=>{
    console.log("backend running on port: 5000")
})

