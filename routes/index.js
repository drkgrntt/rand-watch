var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var request = require("request");
var middleware = require("../middleware");


// LANDING PAGE 
router.get("/", function(req, res) {
    res.render("landing");
});

router.get("/about", function(req, res) {
    res.render("about");
});

// SEARCH PAGE
router.get("/search", function(req, res) {
    res.render("search");
});

// RESULTS PAGE
router.get("/results", middleware.isLoggedIn, function(req, res) {
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=thewdb";
    request(url, function(error, response, body) {
        // I STILL NEED TO REDIRECT ERRORS
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

// CREATE PAGE
router.get("/create", middleware.isLoggedIn, function(req, res) {
    res.render("create");
});

// REGISTER ROUTE
router.get("/register", function(req, res) {
    res.render("register");
});

// HANDLE REGISTER LOGIC
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
            res.redirect("/search");
        });
    });
});

// LOGIN ROUTE
router.get("/login", function(req, res) {
    res.render("login");
});

// HANDLE LOGIN LOGIC
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/search",
        failureRedirect: "/login"
    }), function(req, res) {
});

// LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

module.exports = router;