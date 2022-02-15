const mongoose= require('mongoose');
const dotenv=require('dotenv');
const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
const mongodbconnection=mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(CON=>{
    console.log("db connected sucessfully")
});
 
module.exports=mongodbconnection;
