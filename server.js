const mongoose=require('mongoose')
const dotenv= require("dotenv");
const app= require('./app');
//const dbcon=require('./database/dbmongo');
const Port=process.env.PORT||3000;
dotenv.config({path:'./config.env'});

const DB=process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(CON=>{
    console.log("db connected sucessfully")
});
//dbcon


app.listen(Port,()=>{
    
    console.log("server is active")
});