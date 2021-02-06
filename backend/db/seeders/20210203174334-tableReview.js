'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TableReviews', [{
      userId: 2,
      tableId: 1,
      content: "Great game!"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TableReviews', null, {});
  }
};
