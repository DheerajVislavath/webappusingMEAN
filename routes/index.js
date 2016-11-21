var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var passport = require("passport");

//index route

router.get("/",function(req,res){
  res.render("landing");  
});


//Auth Routes

//Register route
router.get("/register", function(req,res){
    res.render("register");
});

//Sign up route
router.post("/register", function(req,res){
    User.register( {username: req.body.username}, req.body.password, function(err, user){
       if(err){
           console.log(err);
           res.render("register");
       }
       else{
           passport.authenticate("local")(req,res, function(){
               res.redirect("/bestbars");
           });
       }
    });
});

//login route
router.get("/login",function(req,res){
    res.render("loginform")
});

router.post("/login", passport.authenticate("local" ,{
    successRedirect: "/bestbars",
    failureRedirect: "/login"
}), function(req, res){
});

//logout route
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/login");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;