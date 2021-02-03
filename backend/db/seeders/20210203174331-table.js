'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tables', [{
      tableName: 'Tales of Fantastic Adventure',
      hostId: 6,
      isVirtual: true,
      gameTypeId: 1,
      gameSystemId: 1,
      languageId: 1,
      maxPlayers: 5,
      numPlayers: 3,
      isOpen: true
    },
    {
      tableName: 'Test Title',
      hostId: 1,
      isVirtual: false,
      address: '321 128th st SE',
      city: 'Everett',
      state: 'WA',
      country: 'USA',
      zipcode: '61108',
      gameTypeId: 1,
      gameSystemId: 1,
      languageId: 1,
      maxPlayers: 5,
      numPlayers: 3,
      isOpen: true
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tables', null, {});
  }
};
