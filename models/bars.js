var mongoose = require("mongoose");

var barslistSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comments"
        }]
    });
   
module.exports = mongoose.model("Barslist", barslistSchema);
