'use strict';
module.exports = (sequelize, DataTypes) => {
  const PlayerReview = sequelize.define('PlayerReview', {
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    targetUserId: DataTypes.INTEGER,
    tableId: DataTypes.INTEGER
  }, {});
  PlayerReview.associate = function(models) {
    // associations can be defined here
  };
  return PlayerReview;
};