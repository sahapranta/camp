var Campground = require("../models/campground");
var Comment = require("../models/comment");

//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function checkCampgroundOwnership(req, res, next){
        //is user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Not Found");
                res.redirect("back");
            } else {
                //does the user own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();  
                } else {
                    req.flash("error", "You don't have permission to do that");
                    res.redirect("back");
                }
            }    
        });
        } else {
        req.flash("error", "You need to be logged in o do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function checkCommentOwnership(req, res, next){
        //is user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Something Went Wrong. Please Try again!");
                res.redirect("back");
            } else {
                //does the user own the comment?
                if(foundComment.author.id.equals(req.user._id)){
                    next();  
                } else {
                    res.redirect("back");
                }
            }    
        });
        } else {
            req.flash("error", "You don't have permission to do that");
            res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
} 

module.exports = middlewareObj;