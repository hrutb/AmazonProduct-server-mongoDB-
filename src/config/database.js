const mongoose = require('mongoose')

const connectDB = async ()=>{ 
    
        try{ 
             await mongoose.connect('mongodb+srv://hrutwikbaraskar_db_user:lA4udnEJQBj8iMa0@cluster0.ebydb2f.mongodb.net/Products');
             console.log('MongoDB Connected');
        
        }catch(err){
             console.log(err.message);
        }

        
} 





module.exports = connectDB ;