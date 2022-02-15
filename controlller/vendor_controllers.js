const mongoose=require('mongoose');
const Products= require('./../models/productsCreationSchema')
const catchAsync=require('./../utils/catchAsync')
const AppError=require('./../utils/appError')

exports.createProduct=catchAsync(async (req,res)=>{
    console.log(req.header)
    // const proprice= req.body.productprice*1
    // const Product=await Products.create({
    // name:req.body.productname,
    // brandName:req.body.brandname,
    // price:proprice,
    // images:result.url,
    // category:req.body.category,
    // description:req.body.productdescription,
    // rating:req.body.review,
    // maxDiscountedprice:req.body.discountprice,
    // quantity:req.body.quantity

    // });
        
    res.status(200).json({
        status:"okdgsg",
        
    });
});

exports.getAllProduct=catchAsync(async (req,res)=>{
    const allProduct=await Products.find();
    res.status(200).json({
        status:"ok",
        message:"sucess for getiing all product for vendor",
        data:allProduct
    });
});


exports.getSingleProduct=catchAsync(async (req,res)=>{
    const Product=await Products.findById(req.params.id);
    res.status(200).json({
        status:"ok",
        message:"sucess for getiing single product vendor",
        data:Product
    })
});

exports.updateSingleProduct=catchAsync(async (req,res,)=>{
    const updatedProduct= await Products.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    });
    if(!updatedProduct){
        return next(new AppError('there is no product with this id'))
    }
    res.status(200).json({
        status:"ok",
        message:"sucess for updating single product for vendor",
        data:updatedProduct
    });
});


exports.deleteSingleProduct=catchAsync(async (req,res)=>{
    const deleting = await Products.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:"sucessfull",
    });
});