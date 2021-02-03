'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Applications', [{
      userId: 2,
      tableId: 2,
      playStyle: "Yes",
      characterConcept: "I will be somebody",
      whyJoin: "I want to play a game",
      experience: "Newbie!",
      approved: false,
      denied: false
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Applications', null, {});
  }
};
