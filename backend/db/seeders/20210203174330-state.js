'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('States', [{
      stateName: 'Alabama',
    },
    {
      stateName: 'Alaska',
    },
    {
      stateName: 'Arizona',
    },
    {
      stateName: 'Arkansas',
    },
    {
      stateName: 'California',
    },
    {
      stateName: 'Colorado',
    },
    {
      stateName: 'Connecticut',
    },
    {
      stateName: 'District of Columbia',
    },
    {
      stateName: 'Delaware',
    },
    {
      stateName: 'Florida',
    },{
      stateName: 'Georgia',
    },
    {
      stateName: 'Hawaii',
    },
    {
      stateName: 'Idaho',
    },
    {
      stateName: 'Illinois',
    },
    {
      stateName: 'Indiana',
    },
    {
      stateName: 'Iowa',
    },
    {
      stateName: 'Kansas',
    },
    {
      stateName: 'Kentucky',
    },
    {
      stateName: 'Louisiana',
    },
    {
      stateName: 'Maine',
    },
    {
      stateName: 'Maryland',
    },
    {
      stateName: 'Massachusetts',
    },
    {
      stateName: 'Michigan',
    },
    {
      stateName: 'Minnesota',
    },
    {
      stateName: 'Mississippi',
    },
    {
      stateName: 'Missouri',
    },
    {
      stateName: 'Montana',
    },
    {
      stateName: 'Nebraska',
    },
    {
      stateName: 'Nevada',
    },
    {
      stateName: 'New Hampshire',
    },
    {
      stateName: 'New Jersey',
    },
    {
      stateName: 'New Mexico',
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
