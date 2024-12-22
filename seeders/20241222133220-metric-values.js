'use strict';
const moment = require('moment');

const randomValue = (type) => {
  if (type === 'Distance') return Math.floor(Math.random() * 10000);
  if (type === 'Temper') return Math.floor(Math.random() * 45);
}

// Generate metrics data for last 300 days.
function generateMetricValues() {
  const result = [];

  let metricId = 1;
  while (metricId <= 2) {
      for(let i = 0; i < 300; i++) {
          const dateValue = moment().subtract(i, 'days').format('YYYY-MM-DD');
          let metric_value = {
              metricId: metricId,
              value: metricId == 1 ? randomValue('Distance') : randomValue('Temper'),
              date: dateValue,
          }
          result.push(metric_value);
      }
      metricId++;
  }

  return result;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = generateMetricValues();
    await queryInterface.bulkInsert('metric_values', data, {});
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
