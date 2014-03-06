var db = require("../models");
/*
 * User CRUD
 */

//Lists all users
exports.list = function(req, res){
 db.User.findAll().complete(function(err, all) {
  res.send(all);
 });
};

//View user
exports.get = function(req, res){
 var userId = req.params.userId;
 db.User.find({where: { id: userId }}).complete(function(err, user){
  if (!!err) {
   res.send("503");
  }else if (!user) {
   res.send("User missing");
  } else {
   res.send(user.toJSON());
  }
 });
};

//Create user
exports.create = function(req, res) {
 body = req.body;
 if (body.username && body.password && body.email) {
  db.User.create({
    username: body.username,
    password: body.password,
    email: body.email,
  }).complete(function(err, user){
   if (err == null) {
    res.send(user.toJSON());
   } else {
    res.send(err.toJSON());
   }
  });
 } else {
  res.send("Err");
 }
};

//Update
exports.update = function(req, res) {
 var userId = req.params.userId;
 db.User.find({where: { id: userId }}).complete(function(err, user){
  if (!!err) {
   res.send("503");
  }else if (!user) {
   res.send("User missing");
  } else {
   var body = req.body;
   if (body.username) {
    user.username = body.username;
   }
   if (body.password) {
    user.password = body.password;
   }
   if (body.email) {
    user.email = body.email;
   }
   user.save().complete(function(err, newUser){
    res.send(newUser.toJSON());
   });
  }
 });
}

//Delete
exports.del = function(req, res) {
 var userId = req.params.userId;
 db.User.find({where: { id: userId }}).complete(function(err, user){
  if (!!err) {
   res.send("503");
  }else if (!user) {
   res.send("User missing");
  } else {
   user.destroy();
   res.send("removed");
  }
 });
}


