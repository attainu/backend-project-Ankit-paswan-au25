const express= require('express');
const viewcontroller=require('./../controlller/viewconttroller');
const Userauthcontroller=require('./../auth/userAuth')
const Vendorauthcontroller=require('./../auth/vendorAuth')
const vendorfunctioncontroller =require('./../controlller/vendor_controllers')
const router=express.Router();

//index page  routes
router.get('/',viewcontroller.viewProduct)
router.get('/product/:slug',viewcontroller.viewvendors)
router.post('/searchedProducted',viewcontroller.searchedProducted)


//All page-header login routes
router.get('/userlogin',viewcontroller.userlogin)
router.get('/vendorlogin',viewcontroller.vendorlogin)
router.get('/adminlogin',viewcontroller.adminlogin)

//-----------------------------------------------login post routes
router.post('/userlogin',Userauthcontroller.userlogin,viewcontroller.viewProduct);
router.post('/vendorlogin',Vendorauthcontroller.vendorlogin,viewcontroller.adminvendorlogipage)



//signup routes for get
router.get('/vendorsignup',viewcontroller.vendorsignup)
router.get('/adminsignup',viewcontroller.adminsignup)
router.get('/usersignup',viewcontroller.usersignup)


//signup routes for Post
router.post('/usersignup',Userauthcontroller.usersignup)
router.post('/vendorsignup',Vendorauthcontroller.vendorsignup)


//Userauthcontroller.protectvendor,
//web features routes
router.post('/createproduct',Userauthcontroller.protectvendor,vendorfunctioncontroller.createProduct)
router.post('/index/update/product',Userauthcontroller.protectvendor,vendorfunctioncontroller.updateSingleProduct)
router.post('/index/delete/product',Userauthcontroller.protectvendor,vendorfunctioncontroller.deleteSingleProduct)


module.exports=router