var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var lodash = require("lodash");
//Create a connection to the database,
//Sequelize(db, username, password)
var sequelize = new Sequelize('sq_test', 'root', 'NvideA', {
  dialect: "mysql",
  port: 3306,
}
);
var db = {}

//Read all files in dir and import them
//This allowes us to write models in seperate files
fs.readdirSync(__dirname).filter(function(file) {
 return (file.indexOf('.') !== 0) && (file !== "index.js");
}).forEach(function(file){ 
var model = sequelize.import(path.join(__dirname, file));
db[model.name] = model;
})

//Run model associations
Object.keys(db).forEach(function(modelName) {
 if ('associate' in db[modelName]) {
  db[modelName].associate(db);
 }
})

//Sync models to the database
//Force sync will remove all tables that we have models for
var sync = function sync(syncForce) {
 var forceSync = false;
 if (syncForce === true) {
  forceSync = true;
 }
 Object.keys(db).forEach(function(modelName) {
  db[modelName].sync({ force: forceSync });
 });
 console.log("Syncing database, forced:" + forceSync.toString());
}

//Some definition stuff
module.exports = lodash.extend({
  sequelize : sequelize,
  Sequelize : Sequelize,
  cSync : sync
}, db)
