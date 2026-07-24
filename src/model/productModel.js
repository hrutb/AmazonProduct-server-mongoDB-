const mongoose = require('mongoose'); 


 const productSchema= new mongoose.Schema({
                 
             name:{ 
                  required:true,
                  trim:true,
                  type:String,
                  minlength:[5,'Product category must be of at least 4 character'],
                  maxlength:[40,'Product category must be of at most 20 character']  
                },
                
            price:{ 
                required:true,
                trim:true,
                type:Number,
             },
            
             
            category:{ 
                     required:true,
                     trim:true,
                     type:String,
                     minlength:[5,'Product category must be of at least 4 character'],
                     maxlength:[40,'Product category must be of at most 20 character']
                },

            image:{ 
                     required:true,
                     trim:true,
                     type:String
                  },
                  
               },


                  { 
                    timestamps:true
                 }) 

 module.exports =mongoose.model('Products', productSchema);