var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    request         = require("request"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    app             = express(),
    
// MODELS
    User            = require("./models/user"),
    Show            = require("./models/shows"),
    
// ROUTES
    userRoutes      = require("./routes/user"),
    indexRoutes     = require("./routes/index");
    
// APP CONFIG
mongoose.connect("mongodb://localhost/randwatch");
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

// SESSION CONFIG
app.use(require("express-session")({
    secret: "Once again Maggie wins cutest dog!",
    resave: false,
    saveUninitialized: false,
}));

// PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// FOR EVERY TEMPLATE
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// ROUTES CONFIG
app.use("/user/:id", userRoutes);
app.use("/", indexRoutes);

// FIRE IT UP
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The Server Has Started!!!");
});