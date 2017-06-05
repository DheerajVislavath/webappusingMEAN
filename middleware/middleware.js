var Comment = require("../models/comments.js");
var Barslist = require("../models/bars.js");
var middlewareobj = {}

middlewareobj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}


middlewareobj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                req.flash("error", "Something went wrong");
                res.redirect("back");
            }
            else{
                if(comment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You do not have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareobj.checkArticleOwnership = function(req, res, next){
     if(req.isAuthenticated()){
        Barslist.findById(req.params.id, function(err, foundBar){
            if(err){
                console.log(err);
            }
            else{
                    if(foundBar.author.id.equals(req.user._id)){
                         next();
                    }
                    else{
                        req.flash("error", "You do not have permission to do that");
                        res.redirect("back");
                    }
               
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}


module.exports = middlewareobj;