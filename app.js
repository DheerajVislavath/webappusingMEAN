var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local");
var Barslist = require("./models/bars");
var seedDB = require("./seeds"),
    User = require("./models/user"),
    Comment = require("./models/comments");
    
   
seedDB();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/bars_list");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//Passport Config
app.use(require("express-session")({
    secret: "Its a secret, I can't share",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//index route

app.get("/",function(req,res){
  res.render("landing");  
});
app.get("/bestbars", function(req,res){
       Barslist.find({},function(err,allbarslist){
           if(err){
               console.log(err);
           }
           else{
               res.render("bars/bars",{barslist:allbarslist});
           }
       });
});

//barlist routes
app.post("/bestbars", function(req,res){
  //create a form which adds new bar to the barlist
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newBar = {name: name, image: image, description: description};
  Barslist.create(newBar, function(err,newlyCreated){
      if(err){
          console.log(err);
      }
      else {
          res.redirect("/bestbars");
      }
  });
});
app.get("/bestbars/new", function(req,res){
    res.render("bars/newbars.ejs");
});

//SHOW ROUTE
app.get("/bestbars/:id", function(req,res){
    Barslist.findById(req.params.id).populate("comment").exec(function(err, barslist){
        if(err){
           console.log(err);
        }
        else{
            console.log(barslist);
            res.render("bars/show",{barslist:barslist});
        }
    });
});

//COMMENT NEW
app.get("/bestbars/:id/comments/new", isLoggedIn, function(req,res){
    Barslist.findById(req.params.id, function(err, barslist){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/commentform", {barslist:barslist});
        }
    });
});

//COMMENT POST
app.post("/bestbars/:id/comments", isLoggedIn, function(req,res){
    Barslist.findById(req.params.id, function(err, barslist){
        if(err){
            console.log(err);
        }
        else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    barslist.comment.push(comment);
                    barslist.save();
                    res.redirect('/bestbars/' + barslist._id);
                }
            });
        }
    });
});

//Auth Routes

//Register route
app.get("/register", function(req,res){
    res.render("register");
});

//Sign up route
app.post("/register", function(req,res){
    User.register({username: req.body.username}, req.body.password, function(err, user){
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
app.get("/login",function(req,res){
    res.render("loginform")
});

app.post("/login", passport.authenticate("local" ,{
    successRedirect: "/bestbars",
    failureRedirect: "/login"
}), function(req, res){
});

//logout route
app.get("/logout", function(req,res){
    req.logout();
    res.redirect("/login");
});

function isLoggedIn(req,res, next){
    if(req.isAuthenticated){
        return next;
    }
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelpcamp Server has started!");
});

