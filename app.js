var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose"),
    flash    = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override");
var Barslist = require("./models/bars");
var seedDB = require("./seeds"),
    User = require("./models/user"),
    Comment = require("./models/comments"),
    middleware = require("./middleware/middleware.js");
    
var barslistRoutes = require("./routes/barslist.js"),
    commentsRoutes = require("./routes/comments.js"),
    indexRoutes = require("./routes/index.js");
    
mongoose.Promise = global.Promise;
var url = process.env.DATABASEURL || "mongodb://localhost/bars_list";
mongoose.connect(url);


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB();

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

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/bestbars", barslistRoutes);
app.use("/bestbars/:id/comments", commentsRoutes);
app.use("/", indexRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Yelpcamp Server has started!");
});
