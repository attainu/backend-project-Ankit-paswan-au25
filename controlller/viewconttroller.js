const Product=require('./../models/productsCreationSchema');
const Vendor=require('./../models/vendorCreationSchema');
const catchAsync=require('./../utils/catchAsync');

exports.viewProduct=catchAsync(async(req,res,next)=>{
    const Products=await Product.find();
    res.status(200).render('overview',{
        tittle:"Products",
        Products
    })
});
exports.viewvendors=catchAsync(async(req,res,next)=>{
    const Products= await Product.findOne({slug:req.params.slug})
   
    res.status(200).render('details',{
        tittle:"Products",
        Products
    });

});

//searched Product controller
exports.searchedProducted=catchAsync(async (req,res,next)=>{
    let searchval=req.body.searchAll
    let Products= await Product.find({name:searchval})
    
    console.log(searchval)
    res.status(200).render('overview',{
        tittle:"Products",
        Products
        
    });
});


//-----------------------------------------admin and vendor login

exports.adminvendorlogipage=catchAsync(async (req,res)=>{
    res.status(200).render('createproduct',{
        tittle:"controller login",
    })
})

















//----------------------------------------------------login controllers for get
    //user
exports.userlogin=catchAsync(async (req,res,next)=>{
    res.status(200).render('userlogin',{
        tittle:"Userlogin"
    });
});

    //vendor
exports.vendorlogin=catchAsync(async (req,res,next)=>{
    res.status(200).render('vendorlogin',{
        tittle:"Vendorlogin"
    })
});
    
    //admin
exports.adminlogin=catchAsync(async (req,res,next)=>{
    res.status(200).render('adminlogin',{
        tittle:"Adminlogin"
    })
});

//------------------------------------------------------signup controllers for get-
    //user
exports.usersignup=catchAsync(async (req,res,next)=>{
    res.status(200).render('usersignup',{
        tittle:"Usersignup"
    });
});
    
    //vendor
exports.vendorsignup=catchAsync(async (req,res,next)=>{
    res.status(200).render('vendorsignup',{
        tittle:"Vendorsignup"
    });
});
        
        //admin
exports.adminsignup=catchAsync(async (req,res,next)=>{
    res.status(200).render('adminsignup',{
        tittle:"Adminsignup"
    })
});


//signup controllers for get

// exports.login=catchAsync(async(req,res,next)=>{
//     res.status(200).render('login',{
//         tittle:"Login"
//     })
// });

// exports.signin=catchAsync(async(req,res,next)=>{
//     let userIs=req.body.value;
//     res.send(userIs)
// })



