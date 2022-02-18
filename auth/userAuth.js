const User=require('./../models/UserCreationSchema')
const catchAsync= require('./../utils/catchAsync');
const {promisify}=require('util');
const vendor=require('./../models/vendorCreationSchema');
const AppError=require('./../utils/appError');
const jwt=require('jsonwebtoken')

const signToken=id=>{
    return jwt.sign({id},process.env.JWT_SCERETE,{
    expiresIn:process.env.JWT_EXPIRESIN
});
}

//----------------------------------------------------signup

exports.usersignup= catchAsync(async (req,res,next)=>{

    const newUser= await User.create({
        name:req.body.name,
        email:req.body.email,
        phoneno:req.body.phoneno,
        password:req.body.password,
        confirmpassword:req.body.confirmpassword
    });
    const token=signToken(newUser.id)
    console.log(token)
    res.status(201).send("Sucessfully register please signup ");
});

//---------------------------------------------------login

exports.userlogin=catchAsync(async(req,res,next)=>{
    const useremail =req.body.email 
    const userpassword =req.body.password;
    //checking email password entered or not
    if( !useremail || !userpassword){
        return next(new AppError('please provide email password',400));
    }
    //verifying password and email
    const user= await User.findOne({email:useremail}).select('+password')
    if(!user||!(await user.correctpassword(userpassword,user.password))){
        return next(new AppError('Incorrect email or password'))
    }
    //if everythings ok sending token
    const token=signToken(user._id);
    next();

});

exports.protect=catchAsync(async(req,res,next)=>{

    //checking token
    let token;
    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer'))
    {
        token=req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError('you are not loggedin',401));
    }
 
    //verifying token
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SCERETE);
    
    const freshuser=await User.findById(decoded.id);
    if (!freshuser){
        return next(new AppError("user not exist"));
    }
    //if token exist and password has been changed then restricting
    if(freshuser.ChangesPasswordAt(decoded.iat)){
        return next(new AppError("recently password has been changed",401));
    }
 
    // grant acess
    req.user=freshuser
    next();
});


exports.protectvendor=catchAsync(async(req,res,next)=>{
        console.log(req.headers,"hi to check authorization")
    //checking token
    let token;
    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer'))
    {
        token=req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError('you are not loggedin',401));
    }
    console.log(token)
    //verifying token
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SCERETE);
    
    const freshuser=await vendor.findById(decoded.id);
    if (!freshuser){
        return next(new AppError("user not exist"));
    }
    //if token exist and password has been changed then restricting
    if(freshuser.ChangesPasswordAt(decoded.iat)){
        return next(new AppError("recently password has been changed",401));
    }
 
    // grant acess
    req.user=freshuser
    next();
});

exports.protectadmin=catchAsync(async(req,res,next)=>{

    //checking token
    let token;
    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer'))
    {
        token=req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError('you are not loggedin',401));
    }
 
    //verifying token
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SCERETE);
    
    const freshuser=await User.findById(decoded.id);
    if (!freshuser){
        return next(new AppError("user not exist"));
    }
    //if token exist and password has been changed then restricting
    if(freshuser.ChangesPasswordAt(decoded.iat)){
        return next(new AppError("recently password has been changed",401));
    }
 
    // grant acess
    req.user=freshuser
    next();
});