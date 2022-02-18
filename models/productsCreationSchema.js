const slugify=require('slugify');
const mongoose=require('mongoose');
const product=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"product must have name",],
        minlength:[4,"product must have four letter"],
        trim:true
    },
    slug:{
        type:String
    },
    brandName:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:[true,'product must have price ']

    },
    images:{
        type:String
    },
    imagecover:{
        type:String,
        
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:4.5,

    },
    maxDiscountedprice:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    }
});
product.pre('save',function(next){
     this.slug=slugify(this.name,{lower:true});
     next();
})
const NewProduct=mongoose.model('NewProduct',product)
module.exports=NewProduct