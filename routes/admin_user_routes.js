const express=require('express');
const admin_controller=require('./../controlller/admin_user_controllers')
const router=express.Router();
router
.route('/')
.get(admin_controller.getallUser)
.post(admin_controller.createUser)

router
.route('/:id')
.get(admin_controller.getSingleUser)
.patch(admin_controller.updateSingleUser)
.delete(admin_controller.deleteSingleUser)

module.exports=router