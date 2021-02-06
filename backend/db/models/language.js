'use strict';
module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define('Language', {
    language: DataTypes.STRING
  }, {});
  Language.associate = function(models) {
    Language.hasMany(models.Table, { foreignKey: "languageId", })
  };
  return Language;
};
