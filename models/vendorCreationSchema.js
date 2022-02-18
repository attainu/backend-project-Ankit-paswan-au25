const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const validator=require('validator');
const vendorlogin= new mongoose.Schema({
    shopname:{
        type:String,
        required:[true,"vendor must have Shop name"],
    },
    shopownername:{ 
        type:String,
        trim:true,
        required:[true,"shop must have owner"],
    },
    shopemail:{
        type:String,
        unique:true,
        validate:[validator.isEmail,"please provide valid email"]
    },
    shoptype:{
        type:String,
        required:[true,"shop must have type like grocesries or clothes,or under gurments"],
    },
    shopaddress:{
        type:String,
        required:[true,"please enter exact addrerss of the shop"],
        unique:true,
    },
    shopnumber:{
        type:Number,
        minlength:10,
        maxlength:10,
        
    },
    ownernumber:{
        type:Number,
        required:[true,"owner number is required for admin confirmation"],
        unique:true,
        minlength:10,
        maxlength:10
    },
    password:{
        type:String, 
        require:true,
        minlength:[8,"password 8 chr must have four letter"],
        Select:false
    }

});
vendorlogin.pre('save',async function(next){
    if(!this.isModified('password'))return next();
    this.password=await bcrypt.hash(this.password,10);
});
vendorlogin.methods.correctpassword=async function(candidatePassword,vendorpassword){
    return await bcrypt.compare(candidatePassword,vendorpassword)
};
const NewVendor=mongoose.model("Newvendor",vendorlogin );
 module.exports=NewVendor