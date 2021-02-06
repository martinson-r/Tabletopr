'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GameSystems', [{
      gameSystem: 'Dungeons & Dragons',
    },
    {
      gameSystem: 'Pathfinder',
    },
    {
      gameSystem: 'Shadowrun',
    },
    {
      gameSystem: 'Blue Rose',
    },
    {
      gameSystem: 'Warrior, Rogue & Mage',
    },
    {
      gameSystem: 'Labyrinth Lord',
    },
    {
      gameSystem: 'GURPS',
    },
    {
      gameSystem: 'World of Darkness',
    },
    {
      gameSystem: 'Vampire: The Masquerade',
    },
    {
      gameSystem: 'd20 System (generic)',
    },
    {
      gameSystem: 'Paranoia',
    },
    {
      gameSystem: 'Fate',
    },
    {
      gameSystem: 'Call of Cthulhu',
    },
    {
      gameSystem: 'd20 Modern',
    },
    {
      gameSystem: 'Exalted',
    },
    {
      gameSystem: 'Lamentations of the Flame Princess',
    },
    {
      gameSystem: 'Warhammer',
    },
    {
      gameSystem: 'Big Eyes, Small Mouth',
    },
    {
      gameSystem: 'Mutants & Masterminds',
    },
    {
      gameSystem: 'TORG',
    },
    {
      gameSystem: '7th Sea',
    },
    {
      gameSystem: 'Dungeon World',
    },
    {
      gameSystem: 'Champions/Hero',
    },
    {
      gameSystem: 'Spirit of the Century',
    },
    {
      gameSystem: 'All Flesh Must Be Eaten',
    },
    {
      gameSystem: 'Changeling',
    },
    {
      gameSystem: 'Frontier Space',
    },
    {
      gameSystem: 'BattleTech',
    },
    {
      gameSystem: 'Palladium',
    },
    {
      gameSystem: 'Amber Diceless Roleplaying',
    },
    {
      gameSystem: 'Marvel Heroic RPG',
    },
    {
      gameSystem: 'FASERIP',
    },
    {
      gameSystem: 'Freeform',
    },
    {
      gameSystem: 'Miscellaneous/Other',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GameSystems', null, {});
  }
};
