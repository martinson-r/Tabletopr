'use strict';
module.exports = (sequelize, DataTypes) => {
  const TableReview = sequelize.define('TableReview', {
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    tableId: DataTypes.INTEGER
  }, {});
  TableReview.associate = function(models) {
    TableReview.belongsTo(models.Table, { foreignKey: "tableId", });
    TableReview.belongsTo(models.User, { foreignKey: "userId", });
  };
  return TableReview;
};
