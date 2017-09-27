var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data =[
    {
        name:"Cloud Rests",
        image:"https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
        description:"What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        name:"Deserts Mesa",
        image:"https://farm9.staticflickr.com/8456/8006869967_de2ed3e564.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu consectetur dolor. Vivamus id urna ex. Nunc ut velit tincidunt, varius ex vel, mattis felis. Duis nec tincidunt neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque pretium dictum arcu in pellentesque. Quisque magna nulla, rutrum id elit in, sagittis tempus ante. Pellentesque non nulla turpis. Praesent sit amet egestas leo. Etiam ornare nisl felis, ac iaculis lorem dictum at. Etiam egestas lorem quis congue porttitor. Nulla velit ante, finibus quis felis vel, luctus molestie magna. Suspendisse faucibus neque ut maximus interdum. Etiam ac libero nisi. Duis molestie porttitor elit et aliquam. Fusce fringilla, ipsum sed pellentesque placerat, metus sapien elementum quam, eget venenatis leo mauris ut augue. Maecenas tristique ullamcorper ullamcorper. Phasellus egestas est at enim sagittis interdum. Vestibulum pulvinar finibus lacus ac pretium. Quisque lobortis nisi id mauris interdum, sed ullamcorper lectus bibendum. Curabitur hendrerit purus ut suscipit suscipit. Mauris consectetur ultricies viverra."
    },
    {
        name:"Canayon Floor",
        image:"https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu consectetur dolor. Vivamus id urna ex. Nunc ut velit tincidunt, varius ex vel, mattis felis. Duis nec tincidunt neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Pellentesque pretium dictum arcu in pellentesque. Quisque magna nulla, rutrum id elit in, sagittis tempus ante. Pellentesque non nulla turpis. Praesent sit amet egestas leo. Etiam ornare nisl felis, ac iaculis lorem dictum at. Etiam egestas lorem quis congue porttitor. Nulla velit ante, finibus quis felis vel, luctus molestie magna. Suspendisse faucibus neque ut maximus interdum. Etiam ac libero nisi. Duis molestie porttitor elit et aliquam. Fusce fringilla, ipsum sed pellentesque placerat, metus sapien elementum quam, eget venenatis leo mauris ut augue. Maecenas tristique ullamcorper ullamcorper. Phasellus egestas est at enim sagittis interdum. Vestibulum pulvinar finibus lacus ac pretium. Quisque lobortis nisi id mauris interdum, sed ullamcorper lectus bibendum. Curabitur hendrerit purus ut suscipit suscipit. Mauris consectetur ultricies viverra."
    }
    

]

function seedDB(){
    //remove all campgrounds
    Campground.remove({}, function(err){
    /*   if(err){
           console.log(err);
       }
       console.log("Removed Campgrounds!!");
        //added Campgrounds
        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
               if(err){
                   console.log(err);
               } else {
                   console.log("Added Campground!!");
                   //create a comment
                   Comment.create(
                   {
                       text:"This place is great",
                       author:"Homer"
                    }, function(err, comment){
                       if (err){
                           console.log(err);
                       } else {
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created New Comment");
                       }
                   });
               }
            });
        });*/
    });
}

module.exports = seedDB;