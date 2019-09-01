const Sequelize = require("sequelize");
require("../config/environment");

const sequelize = new Sequelize('library_development', 'root', process.env.PASSWORD_DB, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;