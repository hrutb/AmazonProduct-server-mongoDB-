



const Product = require('../model/productModel');


async function sendProducts(req,res){ 

    try{ 
      // QueryParams
       const searchVal = req.query.search  || ""; 
       const categoryVal = req.query.category || '';        
      
      //  server side pagignation
        const page = parseInt(req.query.page)|| 1;
        const limit  =parseInt(req.query.limit)||10; 

        const skip = (page-1)* limit;

         let filter ={} 

         if(searchVal){ 
             filter.name = {$regex:searchVal, $options:'i'};
         }
          
           if(categoryVal){ 
             filter.category = {$regex:categoryVal, $options:'i'};
                
           } 
        
      let products  = await Product.find(filter).sort({createdAt:-1}).skip(skip).limit(limit);
         res.status(200).json({ 
                success:true,
                data:products,
                count:products.length                
          })
            


        }catch(err){
            res.status(500).json({ 
                success:false,
                message:err.message           
              })  
        }
} 

async function sendProductById(req,res){
        try{ 
            let product = await Product.findById(req.params.id);     
   
            res.status(200).json({ 
                       success:true,
                       data:product
                  })
             
               

           }catch(err){ 
            res.status(500).json({ 
                     success:false,
                     message:err.message
                })
          
          }
}

async function createProduct(req,res){


   try{  
         

       const product = await Product.create(req.body);

     res.status(201).json({ 
               success:true,
               data:product
     })
     
   }catch(e){ 
            if(e.name==="ValidationError"){ 
                 res.status(400).json({ 
                      success:false,
                       message:'Validation failed',
                       error:Object.values(e.errors).map(err=>err.message) // this will give me the new array of different errors
                   })
            }    
            //  res.status(500).json({ 
            //          success:false,

            //     })
    }
} 







module.exports = { 
         sendProducts,sendProductById,createProduct
}