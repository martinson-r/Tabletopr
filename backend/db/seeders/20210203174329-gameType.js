'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GameTypes', [{
      gameType: 'Play by Post',
    },
    {
      gameType: 'Physical Table',
    },
    {
      gameType: 'Zoom',
    },
    {
      gameType: 'LARP',
    },
    {
      gameType: 'Discord',
    },
    {
      gameType: 'Roll20',
    },
    {
      gameType: 'Ventrilo',
    },
    {
      gameType: 'VOIP (other)',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GameTypes', null, {});
  }
};
