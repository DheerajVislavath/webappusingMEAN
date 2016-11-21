var express = require("express");
var router = express.Router({mergeParams: true});
var Barslist = require("../models/bars.js");
var Comment = require("../models/comments.js"),
    middleware = require("../middleware/middleware.js");

//COMMENT NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req,res){
    Barslist.findById(req.params.id, function(err, barslist){
        if(err){
            console.log(err);
        }
        else{
            res.render("comments/commentform", {barslist:barslist});
        }
    });
});

//COMMENT POST ROUTE
router.post("", middleware.isLoggedIn, function(req,res){
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
                    comment.author.id = req.user._id;
                    comment.author.username= req.user.username;
                    comment.save();
                    barslist.comment.push(comment);
                    barslist.save();
                    res.redirect('/bestbars/' + barslist._id);
                }
            });
        }
    });
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id, function(err, comment) {
            res.render("comments/commentedit", {barslist_id: req.params.id, comment:comment});
    });
});

// COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redirect("back");  
        }
        else{
            res.redirect("/bestbars/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err)
            res.redirect("back");
        }
        else{
            res.redirect("/bestbars/" + req.params.id);
        }
    })
});


module.exports = router;