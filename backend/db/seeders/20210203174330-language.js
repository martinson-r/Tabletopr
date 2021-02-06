'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Languages', [{
      language: 'English',
    },
    {
      language: 'Spanish',
    },
    {
      language: 'Portuguese',
    },
    {
      language: 'Mandarin Chinese',
    },
    {
      language: 'German',
    },
    {
      language: 'Hindi',
    },
    {
      language: 'Arabic',
    },
    {
      language: 'Russian',
    },
    {
      language: 'Japanese',
    },
    {
      language: 'French',
    },
    {
      language: 'Indonesian',
    },
    {
      language: 'Indonesian',
    },
    {
      language: 'Urdu',
    },
    {
      language: 'Swahili',
    },
    {
      language: 'Marathi',
    },
    {
      language: 'Other',
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Languages', null, {});
  }
};
