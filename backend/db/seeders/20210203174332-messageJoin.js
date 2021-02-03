'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('MessageJoins', [{
      messageId: 1,
      tableId: 1,
    },
    {
      messageId: 2,
      tableId: 2,
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MessageJoins', null, {});
  }
};
