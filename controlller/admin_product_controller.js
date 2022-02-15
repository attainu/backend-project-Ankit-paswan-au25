const Products =require('./../models/productsCreationSchema');
const catchAsync=require('./../utils/catchAsync');
const AppError=require('./../utils/appError')
//below Creating product by admin
exports.createProduct=catchAsync(async (req,res)=>{
    const Product= await Products.create(req.body);
    res.status(200).json({
        status:"sucessfully Created New Product",
        Product
    });
});

//below Reading All products by admin
exports.getAllProduct=catchAsync(async (req,res)=>{
    const AllProducts=await Products.find();
    res.status(200).json({
        status:"sucessfully feteched all Product",
        AllProducts
    });
});
//below Reading product by admin
exports.getSingleProduct=catchAsync(async (req,res)=>{
    const Product= await Products.findById(req.params.id);
    if(!Product){
     return   res.status(401).json({
            status:"details not found please check id",
            Product
        });
    }
    res.status(200).json({
        status:"sucessfully fetched one Product details",
        Product
    });
});
//below Updating All product deatils  by admin
exports.updateSingleProduct=catchAsync(async (req,res,next)=>{
    const Product= await Products.findById(req.params.id);//checking product is available in database or not
    if(!Product){
       return next(new AppError("plese provide valid id"));
    }
    const updatedProduct= await Products.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        status:"sucessfully updated one data",
        Product:updatedProduct
    });
});

//below deleting All product deatils  by admin
exports.deleteSingleProduct=catchAsync(async (req,res)=>{
    const deleteProduct= await Products.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status:"sucessfully deleted",
    });
});


