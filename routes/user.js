var express = require("express");
var router = express.Router({mergeParams: true});
var User = require("../models/user");
var Show = require("../models/shows");
var middleware = require("../middleware");

// USER PROFILE PAGE
router.get("/", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id).populate("shows").exec(function(err, foundUser){
        if(err){
            console.log(err);
        } else {
            res.render("profile", {user: foundUser});
        }
    });
});

// ADD TO LIST LOGIC
router.post("/", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id, function(err, user){
        if(err){
            console.log(err);
            res.redirect("/search");
        } else {
            Show.create(req.body.show, function(err, show){
                if(err){
                    res.redirect("back");
                } else {
                    show.save();
                    user.shows.push(show);
                    user.save();
                    res.redirect("/user/" + user._id);
                }
            });
        }
    });
});

// CHOOSE PAGE
router.get("/choose", middleware.isLoggedIn, function(req, res){
    User.findById(req.params.id).populate("shows").exec(function(err, user) {
        if(err) {
            console.log(err);
            res.redirect("back");
        } else {
            if(req.xhr) {
                res.json(user);
            } else {
            res.render("choose", {user: user});
            }          
        }
    });
});

// DESTROY ROUTE
router.delete("/:show_id", middleware.isLoggedIn, function(req, res){
    Show.findByIdAndRemove(req.params.show_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/user/" + req.params.id);
        }
    });
});

module.exports = router;