const catchAsync=require('./../utils/catchAsync')
const AppError=require('./../utils/appError')
const vendorauth=require('./../auth/vendorAuth')
const vendor=require('./../models/vendorCreationSchema')
exports.getAllVendors=catchAsync(async (req,res)=>{
    const allVendor= await vendor.find();
    res.status(200).json({
        status:"ok",
        message:"Sucess foe getting all vandor for admin",
        data:allVendor
    });
});
exports.createVendor=vendorauth.vendorsignup//catchAsync(async (req,res)=>{});
exports.getSingleVendor=catchAsync(async (req,res)=>{
    const singleVendor = await vendor.findById(req.params.id)
    res.status(200).json({
        status:"sucessfull",
        data:singleVendor
    })
});
exports.updateSingleVendor=catchAsync(async (req,res)=>{
    const updatedvendor= await vendor.findByIdAndUpdate(req.params.id,req.body)
    res.status(200).json({
        status:"ok",
        data:updatedvendor
    }); 
});
exports.deleteSingleVendor=catchAsync(async (req,res)=>{
    const deletevendor=await vendor.findByIdAndDelete(req.params.id)
    res.status(200).json({
        status:"ok",
        message:"delete sucessfully"
    });
});