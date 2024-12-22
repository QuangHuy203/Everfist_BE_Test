'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('metrics', [
      {
        userId: 1,
        metricName: 'Distance-01',
        type: 'Distance',
        unit: 'meter'
      },
      {
        userId: 1,
        metricName: 'Temperature-01',
        type: 'Temperature',
        unit: 'C'
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
