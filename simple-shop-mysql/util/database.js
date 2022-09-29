const Sequelize = require("sequelize");

// connecting database
const sequelize = new Sequelize("simple-db", "root", "12345", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
