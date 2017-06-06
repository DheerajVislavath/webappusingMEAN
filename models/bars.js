var mongoose = require("mongoose");

var barslistSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    author: {
    id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    username: String
},
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
        }]
    });
   
module.exports = mongoose.model("Barslist", barslistSchema);
