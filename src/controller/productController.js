



const Product = require('../model/productModel');


async function sendProducts(req,res){ 

    try{ 
      // QueryParams
       const searchVal = req.query.name  || ""; 
       const categoryVal = req.query.category || '';        
    
      //  server side pagignation
        const page = parseInt(req.query.page)|| 1;
        const limit  =parseInt(req.query.limit)||10; 

        const skip = (page-1)* limit;

         let filter ={} 

         if(searchVal){ 
             filter.name ={$regex:searchVal, $options:'i'};
         }
          
           if(categoryVal){ 
             filter.category ={$regex:categoryVal, $options:'i'};
                
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



async function deleteProduct(req,res){ 
     const {id}  = req.params.id;           

         try { 
          let deleteProduct = await Product.findByIdAndDelete(id); 
 
             if(!product){ 
                   res.status(404).json({ 
                          success:false,
                          message:"Product not found",
                  })
             }             
          res.status(200).json({ 
               success:true,
               message:"deleted successfully",
               data: deleteProduct        
          })

        }catch(err){ 
         
            res.status(500).json({ 
                  success:false,
                  message:'Internal server Error'     
             })
        }
}





async function updateProduct(req,res){
           try{ 
             let updateProduct = await Product.findByIdAndUpdate(
                                  id,
                                  req.body,
                                  { 
                                    new:true, // return the  updateed document, not old one 
                                    runValidators:tur // enforce schema validation on update

                                  }
                                ); 
                
               if(!updateProduct){ 
                   res.status(404).json({ 
                        success:false,
                        mesasge:'Product not found'
                     })
                }                  
                   res.status(200).json({ 
                        success:true,
                        message:'Product updated successfully',
                        data:updateProduct       
                   })


           }catch(e){ 
               if(e.name==="ValidationError"){ 
                   res.status(404).json({ 
                        success:false,
                        message:"Validation Error",
                        error:Object.values(e.errors).map(err=>err.message)
                     })   
                }


              res.status(500).json({ 
                  success:false,
                  message:'Internal server Error', 
                })   
           }
}





module.exports = { 
         sendProducts,sendProductById,createProduct,
         deleteProduct
        
        }