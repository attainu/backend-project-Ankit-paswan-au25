const express=require('express');
const admin_controller=require('./../controlller/admin_product_controller')
const router=express.Router();
router
.route('/')
.get(admin_controller.getAllProduct)
.post(admin_controller.createProduct)

router
.route('/:id')
.get(admin_controller.getSingleProduct)
.patch(admin_controller.updateSingleProduct)
.delete(admin_controller.deleteSingleProduct)

module.exports=router
