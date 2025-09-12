const mysql=require('mysql2')

const connection=mysql.createConnection({
    host:"localhost",
    port:3307,
    database:"library_system",
    password:"",
    user:"root"
})

connection.connect(()=>{
    console.log("database connected")
})

module.exports=connection

