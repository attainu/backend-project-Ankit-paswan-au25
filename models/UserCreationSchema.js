const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcryptjs')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:[true,'Please tell your Name']
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail,"please enter correct email"]
    },
    phoneno:{
        type:Number,
        required:true,
        unique:true,
        minlength:10,
        maxlength:10
    },
    profilepic:{
        type:String,
        default:'default.jpg',
    },
    password:{
        type:String,
        minlength:[8,"pasword must have 8 digits"],
        required:[true,"A user must have password"],
        Select:false
    },
    confirmpassword:{
        type:String,
        required:[true,"Plese confirm your password"],
        validate:{
            validator:function(el){
            return el===this.password
        },
        message:"password are not same"
    }
        
    }
});
userSchema.pre('save',async function(next){
    if(!this.isModified('password'))return next();

    this.password= await bcrypt.hash(this.password,10);
    this.confirmpassword=undefined;
});
userSchema.methods.correctpassword=async function(candidatePassword,vendorpassword){
    console.log("hi")
    return await bcrypt.compare(candidatePassword,vendorpassword)
}
const NewUser=mongoose.model('NewUser',userSchema);
module.exports=NewUser