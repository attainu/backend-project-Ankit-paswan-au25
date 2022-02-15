const path =require('path');
const bodyParser=require('body-parser')
const express= require('express');
const vendor_route=require('./routes/vendor_routes');
const user_route=require('./routes/user_routes');
const admin_product_route=require('./routes/admin_product_routes');
const admin_user_route=require('./routes/admin_user_routes');
const admin_vendor_route=require('./routes/admin_vendor_routes');
const viewrouter=require('./routes/viewroues')
const app=express();
// //app.use(express.json());

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


app.use('/index',viewrouter);
app.use('/admin/product',admin_product_route);
app.use('/admin/user',admin_user_route);
app.use('/admin/vendor',admin_vendor_route);
app.use('/vendor',vendor_route);
app.use('/user',user_route);


module.exports= app