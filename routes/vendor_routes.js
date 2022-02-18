const express=require('express');
const vendor_controller=require('./../controlller/vendor_controllers');
const vendorAuth=require('./../auth/vendorAuth');
const router=express.Router();
// router.post('/signup',vendorAuth.vendorsignup);
// router.post('/signin',vendorAuth.vendorsignin);
router
.route('/')
.get(vendor_controller.getAllProduct)
.post(vendor_controller.createProduct)


router
.route('/:id')

.get(vendor_controller.getSingleProduct)
.patch(vendor_controller.updateSingleProduct)
.delete(vendor_controller.deleteSingleProduct)

module.exports=router