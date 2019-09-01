const Sequealize = require("sequelize");

const sequealize = new Sequealize('database', 'root', process.env.PASSWORD_DB, {
    host: 'localhost',
    dialect: 'mysql'
});
