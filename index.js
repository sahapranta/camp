/* ***********************
    AUTHOR: PRANTA SAHA
    Version: 9.0.0
    Express, Node.js, ejs
    Mongoose, Mongodb,
    body-parser, flash etc.
   *********************** */
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var flash = require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var methodOverride = require("method-override");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");


//Schema
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var User = require("./models/user");
//var seedDB = require("./seed");

// requring Routers
var campgroundRoutes = require("./routes/campgrounds"),
    commentRoutes    = require("./routes/comments"),
    authRoutes       = require("./routes/index")
    
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://hksamacar:samacar@ds149844.mlab.com:49844/hksamacar');
//npm install mongoose@4.7.2 (latest version not work properly)!

//seedDB();//seeding Database


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
//Passport Configuration
app.use(require("express-session")({
    secret: "Asim Kumar Roy",
    resave:false,
    saveUninitialized:false
    
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
   
});

//Route RESTFUL
// ************
app.get("/", function(req, res){
    res.render("landing");
});

app.use(authRoutes);
app.use("/campground", campgroundRoutes);
app.use("/campground/:id/comments", commentRoutes);

/*/ comment Routes
app.get("/campground/:id/comments/new", isLoggedIn ,function(req, res){
   Campground.findById(req.params.id, function(err, campground){
      if(err){
          console.log(err);
      } else {
          res.render("comments/new", {campground: campground});  
      }
   });
});

app.post("/campground/:id/comments", isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
     if(err){
         console.log(err);
         res.redirect("/campground");
     } else {
         Comment.create(req.body.comment, function(err, comment){
             if(err){
                 console.log(err);
             } else {
                 comment.author.id = req.user._id;
                 comment.author.username = req.user.username;
                 comment.save();
                 campground.comments.push(comment);
                 campground.save();
                 res.redirect("/campground/"+ campground._id);
             }
         });
     } 
   });
});
*/ 
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.get("*", function(req, res){
    res.send("<h1>Ooops!! page Not Found!</h1>");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp server started");
});