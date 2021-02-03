'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerList = sequelize.define('PlayerList', {
    tableId: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER
  }, {});
  PlayerList.associate = function(models) {
    // associations can be defined here
  };
  return PlayerList;
};