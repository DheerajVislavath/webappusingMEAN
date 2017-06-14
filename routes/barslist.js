var express = require("express");
var router = express.Router();
var Barslist = require("../models/bars.js"),
    middleware = require("../middleware/middleware.js");

router.get("/", function(req,res){
       Barslist.find({},function(err,allbarslist){
           if(err){
               console.log(err);
           }
           else{
               res.render("bars/bars",{barslist:allbarslist});
           }
       });
});

//Barlist routes
router.post("/", middleware.isLoggedIn,function(req,res){
  //create a form which adds new bar to the barlist
  var name = req.body.name;
  var price = req.body.price;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  var newBar = {name: name, price: price,  image: image, description: description, author: author};
  Barslist.create(newBar, function(err,newlyCreated){
      if(err){
          console.log(err);
      }
      else {
          req.flash("success", "New Restaurant added!");
          res.redirect("/bestbars");
      }
  });
});

router.get("/new", middleware.isLoggedIn,function(req,res){
    res.render("bars/newbars.ejs");
});

//SHOW ROUTE
router.get("/:id", function(req,res){
    Barslist.findById(req.params.id).populate("comment").exec(function(err, barslist){
        if(err){
            console.log(barslist.user.id);
           console.log(err);
        }
        else{
            res.render("bars/show",{barslist:barslist});
        }
    });
});

//EDIT ROUTE
router.get("/:id/edit", middleware.checkArticleOwnership, function(req, res) {
    Barslist.findById(req.params.id, function(err, foundBar) {
        res.render("bars/editbar.ejs", {barslist: foundBar});
    });
});

//Update Route
router.put("/:id", middleware.checkArticleOwnership,function(req,res){
    Barslist.findByIdAndUpdate(req.params.id, req.body.barslist, function(err, updatedBar){
       if(err){
           console.log(err)
       } else{
           req.flash("success", "Restaurant Updated");
           res.redirect("/bestbars/" + req.params.id);
       }
    });
});


 //Delete Route
 router.delete("/:id", middleware.checkArticleOwnership, function(req, res){
    Barslist.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Restaurant Deleted");
            res.redirect("/bestbars/");
        }
    }) ;
 });
 
module.exports = router ; 
