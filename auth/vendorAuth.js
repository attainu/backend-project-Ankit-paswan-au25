const Vendor=require('./../models/vendorCreationSchema');
const catchAsync= require('./../utils/catchAsync');
const AppError=require('./../utils/appError');
const jwt=require('jsonwebtoken');


const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SCERETE,{
    expiresIn:process.env.JWT_EXPIRESIN
});
}

// const createSendToken = (user, statusCode, res) => {
//     const token = signToken(user._id);
//     const cookieOptions = {
//       expires: new Date(
//         Date.now() + process.env.JWT_EXPIRESIN * 24 * 60 * 60 * 1000
//       ),
//       httpOnly: true
//     };
  
//     //res.cookie('jwt', token, cookieOptions);
  
//     // Remove password from output
//     user.password = undefined;
  
//     // res.status(statusCode).json({
//     //   status: 'success',
//     //   token,
//     //   data: {
//     //     user
//     //   }
//     // });
//   };

//---------------------------------------------------vendorsignup
exports.vendorsignup= catchAsync(async (req,res,next)=>{

    const newVendor= await Vendor.create({
        shopname:req.body.shopname,
        shopownername:req.body.ownername,
        shopemail:req.body.shopemail,
        shoptype:req.body.shoptype,
        shopaddress:req.body.shopaddress,
        shopnumber:req.body.shopnumber,
        ownernumber:req.body.ownernumber,
        password:req.body.password
    });
    const token=signToken(newVendor.id)
    res.status(201).send("sucessfully register");

});
exports.vendorlogin=catchAsync(async(req,res,next)=>{
    const vendoremail=req.body.email ;
    const vendorpassword =req.body.password;
    //checking email password entered or not
    if( !vendoremail || !vendorpassword){
        return next(new AppError('please provide email or  password',400));
    }
    //verifying password and email
    const vendor= await Vendor.findOne({shopemail:vendoremail}).select('+password')
    if(!vendor||!(await vendor.correctpassword(vendorpassword,vendor.password))){
        return next(new AppError('Incorrect email or password'))
    }
    //if everythings ok sending token
    const token=signToken(vendor._id);
    // res.status(200).send("sucessgully logged in")
    // createSendToken(vendor,200)
    console.log(token)
    next();
});

