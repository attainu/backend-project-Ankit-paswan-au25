const catchAsync= require('./../utils/catchAsync');
const Products=require('./../models/productsCreationSchema');

//the below fuction is of showing all product to user
exports.getallproduct=catchAsync(async (req,res)=>{
    const Product= await Products.find()
    res.status(200).json({
        status:"ok",
        Product

    });
});
//the below fuction is of showing single product to user
exports.getsingleproduct=catchAsync(async(req,res)=>{
    const Product=await Products.findOne({slug:req.params.slug});
    res.status(200).json({
        status:"ok",
        Product
    });

});

