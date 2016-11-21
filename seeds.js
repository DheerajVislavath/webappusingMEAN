var mongoose = require("mongoose");

var Barslist = require("./models/bars");
var Comments = require("./models/comments");

var data = [
    {
        name: "Cool Beans",
        image: "https://farm9.staticflickr.com/8610/16684076201_830880c424.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content"
    },
     {
        name: "Cool Beans",
        image: "https://farm9.staticflickr.com/8610/16684076201_830880c424.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content"
    },
     {
        name: "Cool Beans",
        image: "https://farm9.staticflickr.com/8610/16684076201_830880c424.jpg",
        description: "It is a long established fact that a reader will be distracted by the readable content"
    },
    ]
    
    function seedDB(){
        Barslist.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     }
    //     console.log("Barslist Removed");
        
    //     data.forEach(function(seed){
    //         Barslist.create(seed,function(err, barslist){
    //             if(err){
    //                 console.log(err);
    //             }
    //             else{
    //             console.log("Added a Bar!");
                
    //             Comments.create({
    //               text: "This place is great, but I wish there was internet",
    //                         author: "Homer"  }, function(err, comment){
    //                 if(err){
    //                     console.log(err);
    //                 }
    //                 else{
    //                     barslist.comment.push(comment);
    //                     barslist.save();
    //                     console.log("Created a new comment");
    //                 }
    //             });
    //             }
    //         });
    //     });
    });
    }
    
module.exports = seedDB;