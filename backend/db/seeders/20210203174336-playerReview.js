'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('PlayerReviews', [{
      userId: 2,
      targetUserId: 3,
      tableId: 1,
      content: "So much fun to play with! I love them."
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PlayerReviews', null, {});
  }
};
