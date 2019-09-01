'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    role: DataTypes.STRING
  }, {});
  Role.associate = function(models) {
    Role.hasMany(models.User);
    // associations can be defined here
  };
  return Role;
};