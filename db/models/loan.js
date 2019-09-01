'use strict';
module.exports = (sequelize, DataTypes) => {
  const Loan = sequelize.define('Loan', {
    loanDate: DataTypes.DATE,
    limitDate: DataTypes.DATE,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      allowNull: false
    }
  }, {});
  Loan.associate = function(models) {
    Loan.belongsTo(models.User);
    Loan.belongsToMany(models.Book, {through: 'UserBook'});
  };
  return Loan;
};