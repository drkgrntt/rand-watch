var mongoose = require("mongoose");

var showSchema = mongoose.Schema({
    Title: String,
    Poster: String
});

module.exports = mongoose.model("Show", showSchema);