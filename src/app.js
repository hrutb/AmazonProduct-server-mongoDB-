    const express =require('express'); 
    
    const cors = require('cors');

    const productRoutes  =require('./routes/productRoutes');
    
    
    const  app=express();
    
      app.use(cors({ 
            origin:'*',
            methods:["GET","POST","PATCH","PUT","DELETE"]
      }))


      app.use(express.json());
     
      app.use('/api/products' ,productRoutes);

      app.use((req,res)=>{ 
            res.status(400).json({ 
                  success:false,
                  message:'Product routes is not found' 
              })
           })
          

     module.exports= app;