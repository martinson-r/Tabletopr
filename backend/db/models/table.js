'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    tableName: DataTypes.STRING,
    description: DataTypes.STRING,
    hostId: DataTypes.INTEGER,
    isVirtual: DataTypes.BOOLEAN,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    gameTypeId: DataTypes.INTEGER,
    gameSystemId: DataTypes.INTEGER,
    languageId: DataTypes.INTEGER,
    maxPlayers: DataTypes.INTEGER,
    numPlayers: DataTypes.INTEGER,
    isOpen: DataTypes.BOOLEAN
  }, {});
  Table.associate = function(models) {
    Table.belongsTo(models.GameSystem, { foreignKey: "gameSystemId", });
    Table.belongsTo(models.GameType, { foreignKey: "gameTypeId", });
    Table.belongsTo(models.User, { foreignKey: "hostId", });
    Table.belongsTo(models.Language, { foreignKey: "languageId", });
    Table.hasMany(models.TableReview, { foreignKey: "tableId", });
  };
  return Table;
};
