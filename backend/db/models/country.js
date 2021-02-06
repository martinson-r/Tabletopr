'use strict';
module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    countryName: DataTypes.STRING
  }, {});
  Country.associate = function(models) {
    // associations can be defined here
  };
  return Country;
};