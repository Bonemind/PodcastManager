module.exports = function(sequelize, DataTypes) {
 var Role = sequelize.define("Role", {
   name: DataTypes.STRING
 },{
  classMethods: {
   associate: function(models) {
    Role.hasMany(models.Group);
   }
  }
 })
 return Role;
}
