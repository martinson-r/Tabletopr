'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    userId: DataTypes.INTEGER,
    tableId: DataTypes.INTEGER,
    playStyle: DataTypes.STRING,
    characterConcept: DataTypes.STRING,
    whyJoin: DataTypes.STRING,
    experience: DataTypes.STRING,
    approved: DataTypes.BOOLEAN,
    denied: DataTypes.BOOLEAN
  }, {});
  Application.associate = function(models) {
    // associations can be defined here
  };
  return Application;
};