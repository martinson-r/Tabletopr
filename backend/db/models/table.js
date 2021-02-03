'use strict';
module.exports = (sequelize, DataTypes) => {
  const Table = sequelize.define('Table', {
    tableName: DataTypes.STRING,
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
    // associations can be defined here
  };
  return Table;
};
