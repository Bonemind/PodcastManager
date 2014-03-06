var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
 var User = sequelize.define("User", {
   username: DataTypes.STRING,
   password: DataTypes.STRING,
   salt: DataTypes.STRING,
   email: DataTypes.STRING
 },{
  classMethods: {
   associate: function(models) {
    User.belongsTo(models.Group);
   }
  }
 },{
  hooks: {
   beforeCreate: function(user, next) {
    encodepw(function() {
     user.password= "override";
     next("test");
    })
   }
  }
 })
 //Override create method to make sure passwords are salted
 User.beforeCreate(function(user, fn) {
  user.salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, user.salt);
  return fn();
 });

 //Make sure passwords are encrypted when changed
 User.beforeUpdate(function(user, fn) {
  if (user._previousDataValues.password !== user.password){
   user.salt = bcrypt.genSaltSync();
   user.password = bcrypt.hashSync(user.password, user.salt);
  };
  return fn();
 });
 return User;
}
