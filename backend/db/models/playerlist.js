'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerList = sequelize.define('PlayerList', {
    tableId: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER
  }, {});
  PlayerList.associate = function(models) {
    PlayerList.belongsTo(models.Table, { foreignKey: "tableId" });
    PlayerList.belongsTo(models.User,{foreignKey: "playerId"});
  };
  return PlayerList;
};
