const express=require('express');
const expressSession=require('express-session');
const oneDay= 1000 * 60 * 60 * 24;
//to start server
const app=express();
//middlewares pipeline configurations
//app.use(express.static('public')); for html pages
// set session middleware configuration
var sessionMiddleware=expressSession({
    secret:'cart',
    saveUninitialized:true,
    cookie:{maxAge: oneDay},
    resave: false

});
app.use(sessionMiddleware);
//http handelers mapping
//go to the start session
app.get('/api/cart',(req,res)=>{
    if(req.session.cart){
        res.send(req.session.cart)
        res.end();
    }
    else{
        req.session.cart=[];
        res.send(req.session.cart);
        res.end();
    }
});
//to add some item in cart
app.get('/api/addtocart/:id',(req,res)=>{
    var item={"product_id":req.params.id,quantity:1};
    console.log(item);
    req.session.cart.push(item);
    res.send(req.session.cart);
    res.end();
    
});
//to remove some item in cart
app.get('/api/removefromcart/:id',(req,res)=>{
    req.session.cart=req.session.cart.filter((data)=>data.product_id !=req.params.id);
    res.send(req.session.cart);
    res.end();
});
//to close session
app.get('/api/cheackout',(req,res)=>{
    req.session.destroy((err)=>{
        res.send('session destroyed');
        res.end();
    })
});




app.listen(8000,()=>{
    console.log('server is listening on port no. 8000');
})