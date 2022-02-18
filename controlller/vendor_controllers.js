const mongoose=require('mongoose');
const upload=require('./../controlller/imagecontroller')
const path = require('path')
const Cloudinary=require('./../dbconfig/cloudinary')
const Products= require('./../models/productsCreationSchema')
const catchAsync=require('./../utils/catchAsync')
const AppError=require('./../utils/appError')
//////////////////////////////////creating product///////////////////////////////
exports.createProduct= upload.single('productpic'),async  (req,res)=>{
    // 
    // console.log(req.header)
    let result=await Cloudinary.uploader.upload(req.file.path)
    const proprice= req.body.productprice*1
    const Product=await Products.create({
    name:req.body.productname,
    brandName:req.body.brandname,
    price:proprice,
    images:result.url,
    category:req.body.category,
    description:req.body.productdescription,
    rating:req.body.review,
    maxDiscountedprice:req.body.discountprice,
    quantity:req.body.quantity

    });
        
    res.status(200).json({
        status:"the below product has een added to data base",
        Product
        
    });
};
///////////////////////////////////////////////////////////view all product//////////////////
exports.getAllProduct=catchAsync(async (req,res)=>{
    const allProduct=await Products.find();
    res.status(200).json({
        status:"ok",
        message:"sucess for getiing all product for vendor",
        data:allProduct
    });
});

///////////////////////////getting all product/////////////////////////////
exports.getSingleProduct=catchAsync(async (req,res)=>{
    const Product=await Products.findById(req.params.id);
    res.status(200).json({
        status:"ok",
        message:"sucess for getiing single product vendor",
        data:Product
    })
});
/////////////////////////updating product/////////////////////////////
exports.updateSingleProduct=catchAsync(async (req,res,next)=>{
    const name=  req.body.productname
    if(!name==null){
        return next(new AppError('Please enter name'))
    }
    const Product = await Products.find({name:name})

    if(productfrombody1 !=null){
        const updatedProductname= await Products.findByIdAndUpdate(Product.id,{name:req.body.productname},{
            new:true,
            runValidators:true
        });
    }
    if(productfrombody !=null){
        const updatedProductbrandname= await Products.findByIdAndUpdate(Product.id,{brandname:req.body.brandname},{
            new:true,
            runValidators:true
        });
    }
    if(productfrombody !=null){
        const updatedProductprice= await Products.findByIdAndUpdate(Product.id,{productprice:req.body.brandname},{
            new:true,
            runValidators:true
        });
    }
    res.status(200).json({
        status:"ok",
        message:"sucess for updating single product for vendor",
        data:updatedProduct
    });
});


exports.deleteSingleProduct=catchAsync(async (req,res)=>{
    const name=  req.body.productname
    if(!name==null){
        return next(new AppError('Please enter name'))
    }
    const Product = await Products.find({name:name})
    if(!Product){
        return next(new AppError('Prodcut name is not valid ')) 
    }
    const deleting = await Products.findByIdAndDelete(Product.id)
    res.status(200).json({
        status:"sucessfull",
    });
});