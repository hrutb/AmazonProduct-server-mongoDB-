const express= require('express'); 

const connectDB = require('./src/config/database');


const app = require('./src/app');


const PORT =3000;


    connectDB(); 




 app.listen(PORT , ()=>{ 
              console.log(`server is running on:http://localhost:${PORT}/api/products`);
 })   