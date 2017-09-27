var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

router.get("/", function(req, res){
    
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campground: allCampgrounds, currentUser:req.user});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id:req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author:author}; 
    //create new and save to dbase
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            req.flash("error", "Something Went Wrong, Please try again");
            console.log(err);
        } else {
             req.flash("success", "Successfully Created.");
             res.redirect("/campground");
        }
    });
});

router.get("/new", middleware.isLoggedIn ,function(req, res){
    res.render("campgrounds/new");
});

router.get("/:id", function(req, res){
    var id = req.params.id;
    Campground.findOne({_id:id}).populate("comments").exec(function (err, foundCampground){
        if(err){
            console.log(err);
        } else {
            req.flash("success", "Welcome");
           res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//edit 
router.get("/:id/edit", middleware.checkCampgroundOwnership ,function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
             res.render("campgrounds/edit", {campground: foundCampground});   
        });  
});

//update
router.put("/:id", middleware.checkCampgroundOwnership ,function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
     if(err){
         req.flash("error", "Something Went Wrong, Please try again");
         res.redirect("/campground");
     }  else {
         req.flash("success", "Successfully Updated");
         res.redirect("/campground/" + req.params.id);
     }
   });
});

// destroy campground Route
router.delete("/:id", middleware.checkCampgroundOwnership ,function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           req.flash("error", "Something Went Wrong, Please try again");
           res.redirect("/campground");
       } else {
           req.flash("success", "Successfully Deleted");
           res.redirect("/campground");
       }
    });
});


module.exports = router;