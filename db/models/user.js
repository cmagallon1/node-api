'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    firstSurname: DataTypes.STRING,
    secondSurname: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: DataTypes.STRING,
    roleId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Role',
        key: 'id'
      },
      validate:{
        isIn: [[1,2,3]]
      }
    }
  }, {});
  User.associate = function(models) {
    User.belongsTo(models.Role);
    // User.hasMany(models.Loans);
    User.hasMany(models.Loan);
  };
  return User;
};