'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    loanDate: DataTypes.DATE,
    limitDate: DataTypes.DATE
  }, {});
  Loan.associate = function(models) {
    // associations can be defined here
    Loan.belongsTo(models.User);
    Loan.belongsToMany(model.Book, {through: 'UserBook'});
  };
  return Loan;
};