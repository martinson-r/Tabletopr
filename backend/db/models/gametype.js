'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameType = sequelize.define('GameType', {
    gameType: DataTypes.STRING
  }, {});
  GameType.associate = function(models) {
    GameType.hasMany(models.Table, { foreignKey: "gameTypeId", });
  };
  return GameType;
};
