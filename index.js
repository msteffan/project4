var express = require("express");
var hbs = require("express-handlebars");
var parser = require("body-parser");
var mongoose = require("./db/connection");

var app = express();
var Meds = mongoose.model("Meds");
var Users = mongoose.model("Users");

app.use(parser.json({extended: true}));
app.use("/assets", express.static("public"));
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname: ".hbs",
  layoutsDir: "views",
  partialsDir: "views",
  defaultLayout: "layout-main"
}));


app.get("/api/meds", function(req, res){
  Meds.find().then(function(meds){
    res.json(meds);
  });
});

app.get("/api/users", function(req, res){
  Users.find().then(function(users){
    res.json(users);
  });
});

app.get("/api/users/:user", function(req, res){
  console.log(req.params.user);
  Users.findOne({name: req.params.user}).then(function(user){
    res.json(user);
  });
});

app.post("/api/users", function(req, res){
  User.create(req.body).then(function(user){
    res.json(user)
  })
});

app.get("/*", function(req, res){
  res.render("main", {layout: false});
});

app.listen(3001, function(){
  console.log("It's aliiiiveee!")
})
