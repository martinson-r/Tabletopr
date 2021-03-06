'use strict';
module.exports = (sequelize, DataTypes) => {
  const MessageJoin = sequelize.define('MessageJoin', {
    messageId: DataTypes.INTEGER,
    tableId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {});
  MessageJoin.associate = function(models) {
    // associations can be defined here
    MessageJoin.belongsTo(models.User, { foreignKey: "recipientId" });
    MessageJoin.belongsTo(models.Message, { foreignKey: "messageId"  })
    // MessageJoin.belongsTo(models.User, {foreignKey: "playerId"});
  };
  return MessageJoin;
};
