'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    loanDate: DataTypes.DATE,
    limitDate: DataTypes.DATE
  }, {});
  Loan.associate = function(models) {
    Loan.belongsTo(models.User);
    Loan.belongsToMany(models.Book, {through: 'UserBook'});
  };
  return Loan;
};