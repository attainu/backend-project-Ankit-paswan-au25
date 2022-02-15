const express=require('express');
const user_controller=require('./../controlller/user_controllers')
// const userauth=require('./../auth/userAuth')
const router=express.Router();
// router.post('/signup',userauth.usersignup);
// router.post('/signin',userauth.userlogin);
router
.route('/')
.get(user_controller.getallproduct)
.post()

router
.route('/:id')
.get(user_controller.getsingleproduct)
.patch()
.delete()

module.exports=router