'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('conversion_factors', [
      // Conversion from centimeter
      {
        unitFrom: 'centimeter',
        unitTo: 'inch',
        factor: 0.3937,
        subFactor: null
      },
      {
        unitFrom: 'centimeter',
        unitTo: 'meter',
        factor: 0.01,
        subFactor: null
      },
      {
        unitFrom: 'centimeter',
        unitTo: 'foot',
        factor: 0.0328,
        subFactor: null
      },
      {
        unitFrom: 'centimeter',
        unitTo: 'yard',
        factor: 0.0109,
        subFactor: null
      },
      // Conversion from inch
      {
        unitFrom: 'inch',
        unitTo: 'centimeter',
        factor: 2.54,
        subFactor: null
      },
      {
        unitFrom: 'inch',
        unitTo: 'meter',
        factor: 0.0254,
        subFactor: null
      },
      {
        unitFrom: 'inch',
        unitTo: 'foot',
        factor: 0.0833,
        subFactor: null
      },
      {
        unitFrom: 'inch',
        unitTo: 'yard',
        factor: 0.0277,
        subFactor: null
      },
      // Conversion from meter
      {
        unitFrom: 'meter',
        unitTo: 'centimeter',
        factor: 100,
        subFactor: null
      },
      {
        unitFrom: 'meter',
        unitTo: 'inch',
        factor: 39.37,
        subFactor: null
      },
      {
        unitFrom: 'meter',
        unitTo: 'foot',
        factor: 3.2808,
        subFactor: null
      },
      {
        unitFrom: 'meter',
        unitTo: 'yard',
        factor: 1.0936,
        subFactor: null
      },
      // Conversion from foot
      {
        unitFrom: 'foot',
        unitTo: 'centimeter',
        factor: 30.48,
        subFactor: null
      },
      {
        unitFrom: 'foot',
        unitTo: 'inch',
        factor: 12,
        subFactor: null
      },
      {
        unitFrom: 'foot',
        unitTo: 'meter',
        factor: 0.3048,
        subFactor: null
      },
      {
        unitFrom: 'foot',
        unitTo: 'yard',
        factor: 0.3333,
        subFactor: null
      },
      // Conversion from yard
      {
        unitFrom: 'yard',
        unitTo: 'centimeter',
        factor: 91.44,
        subFactor: null
      },
      {
        unitFrom: 'yard',
        unitTo: 'inch',
        factor: 36,
        subFactor: null
      },
      {
        unitFrom: 'yard',
        unitTo: 'meter',
        factor: 0.9144,
        subFactor: null
      },
      {
        unitFrom: 'yard',
        unitTo: 'foot',
        factor: 3,
        subFactor: null
      },
      // Conversion from C
      {
        unitFrom: 'C',
        unitTo: 'F',
        factor: 1.8,
        subFactor: 32
      },
      {
        unitFrom: 'C',
        unitTo: 'K',
        factor: 1,
        subFactor: 273.15
      },
      // Conversion from F
      {
        unitFrom: 'F', // special
        unitTo: 'C',
        factor: 0.5555,
        subFactor: -32
      },
      {
        unitFrom: 'F', // special
        unitTo: 'K',
        factor: 0.5555,
        subFactor: 459.67
      },
      // Conversion from F
      {
        unitFrom: 'K',
        unitTo: 'C',
        factor: 1,
        subFactor: -273.15
      },
      {
        unitFrom: 'K',  
        unitTo: 'F',
        factor: 1.8,
        subFactor: -459.67
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
