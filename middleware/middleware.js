var Comment = require("../models/comments.js");
var Barslist = require("../models/bars.js");
var middlewareobj = {}

middlewareobj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


middlewareobj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment){
            if(err){
                res.redirect("back");
            }
            else{
                if(comment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    res.redirect("back");
                }
            }
        });    
    }
    else{
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
                        res.redirect("back");
                    }
               
            }
        });
    }
    else{
        res.redirect("back");
    }
}


module.exports = middlewareobj;