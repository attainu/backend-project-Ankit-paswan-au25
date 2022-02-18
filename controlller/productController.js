const catchAsync = require("../utils/catchAsync")

exports.productbuyed=catchAsync(async(res,req)=>{
    res.status(200).send("Product Buyed");
})