'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameSystem = sequelize.define('GameSystem', {
    gameSystem: DataTypes.STRING
  }, {});
  GameSystem.associate = function(models) {
    GameSystem.hasMany(models.Table, { foreignKey: "gameSystemId", });
  };
  return GameSystem;
};
