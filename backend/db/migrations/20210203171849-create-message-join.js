'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MessageJoins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      messageId: {
        type: Sequelize.INTEGER,
        references: { model: "Messages", key: "id" },
      },
      tableId: {
        type: Sequelize.INTEGER,
        references: { model: "Tables", key: "id" },
      },
      recipientId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
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
    return queryInterface.dropTable('MessageJoins');
  }
};
