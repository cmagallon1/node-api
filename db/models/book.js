'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: DataTypes.STRING,
    editorial: DataTypes.STRING,
    releaseDate: DataTypes.DATE
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
    Book.belongsToMany(models.Author, {through: 'BookAuthor'});
    Book.belongsToMany(models.Loan, {through: 'UserBook'});
  };
  return Book;
};