'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tables', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tableName: {
        type: Sequelize.STRING
      },
      hostId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
      },
      isVirtual: {
        type: Sequelize.BOOLEAN
      },
      address: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      stateId: {
        type: Sequelize.INTEGER,
        references: { model: "States", key: "id" },
      },
      countryId: {
        type: Sequelize.INTEGER,
        references: { model: "Countries", key: "id" },
      },
      zipcode: {
        type: Sequelize.STRING
      },
      gameTypeId: {
        type: Sequelize.INTEGER,
        references: { model: "GameTypes", key: "id" },
      },
      gameSystemId: {
        type: Sequelize.INTEGER,
        references: { model: "GameSystems", key: "id" },
      },
      languageId: {
        type: Sequelize.INTEGER,
        references: { model: "Languages", key: "id" },
      },
      maxPlayers: {
        type: Sequelize.INTEGER
      },
      numPlayers: {
        type: Sequelize.INTEGER
      },
      isOpen: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tables');
  }
};
