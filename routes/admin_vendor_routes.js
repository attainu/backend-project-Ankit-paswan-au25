const express=require('express');
const admin_controller=require('./../controlller/admin_vendor_controller')
const router=express.Router();
router
.route('/')
.get(admin_controller.getAllVendors)
.post(admin_controller.createVendor)

router
.route('/:id')
.get(admin_controller.getSingleVendor)
.patch(admin_controller.updateSingleVendor)
.delete(admin_controller.deleteSingleVendor)

module.exports=router