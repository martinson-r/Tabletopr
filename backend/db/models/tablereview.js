'use strict';
module.exports = (sequelize, DataTypes) => {
  const TableReview = sequelize.define('TableReview', {
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    tableId: DataTypes.INTEGER
  }, {});
  TableReview.associate = function(models) {
    // associations can be defined here
  };
  return TableReview;
};