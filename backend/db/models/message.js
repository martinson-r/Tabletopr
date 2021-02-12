'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER
  }, {});
  Message.associate = function(models) {
    // associations can be defined here
    Message.belongsTo(models.User, { foreignKey: "userId" })
    Message.belongsTo(models.User, { as: "Recipient", foreignKey: "recipientId" })
  };
  return Message;
};
