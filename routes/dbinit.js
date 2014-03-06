var db = require("../models");
exports.index = function(req, res){
 var group = "";
 db.Group.create({
   name: "Admin"
 }).complete(function(err, group){
 group = group;

 db.User.create({
   username: "bonemind",
   password: "test",
   salt: "qqwwee",
   email: "subhime@gmail.com",
   GroupId: group.id
 });

 db.Role.create({
   name: "groupmanagement"
 });

 db.Role.create({
   name: "rolemanagement"
 });
 db.Role.findAll().complete(function(err, all) {
  group.setRoles(all);
 });
 res.send("all done");

 });
 }
