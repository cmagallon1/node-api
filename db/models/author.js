'use strict';
module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('Author', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING
  }, {});
  Author.associate = function(models) {
    // associations can be defined here
    Author.belongsToMany(models.Book, {through: 'BookAuthor'});
  };
  return Author;
};