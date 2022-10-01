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
app.get('/api/products',(req,res)=>{
    if(req.session.visit){
        req.session.visit++;
        res.send("<h2>"+req.session.visit+"times get request from broweser</h2>");
        res.end();
    }
    else{
        req.session.visit=1;
        res.send("<h2>"+req.session.visit+"times get request from broweser</h2>");
        res.end();
    }
});

app.get('/api/cart',(req,res)=>{
    req.session.visit++;
    res.send("<h2>"+req.session.visit+"times get request from broweser</h2>");
    res.end();
    
})

app.get('/api/addtocart',(req,res)=>{
    req.session.visit++;
    res.send("<h2>"+req.session.visit+"times get request from broweser</h2>");
    res.end();
    
});

app.get('/api/removefromcart',(req,res)=>{
    req.session.visit--;
    res.send("<h2>"+req.session.visit+"times get request from broweser</h2>");
    res.end();
    
});





app.listen(8000,()=>{
    console.log('server is listening on port no. 8000');
})