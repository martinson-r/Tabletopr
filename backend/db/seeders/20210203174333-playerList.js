'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PlayerLists', [{
      playerId: 1,
      tableId: 1
    },
    {
      playerId: 2,
      tableId: 1
    },
    {
      playerId: 3,
      tableId: 1
    },
    {
      playerId: 4,
      tableId: 2
    },
    {
      playerId: 5,
      tableId: 2
    },
    {
      playerId: 2,
      tableId: 2
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PlayerLists', null, {});
  }
};
