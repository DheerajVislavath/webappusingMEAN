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
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
       if(err){
           console.log(err);
           req.flash("error", err.message );
           res.redirect("/bestbars");
       } else {
             passport.authenticate("local")(req,res, function(){
             req.flash("success", "Welcome " + user.username );
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
    req.flash("success", "You have Successfully Logged out!");
    res.redirect("/bestbars");
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;