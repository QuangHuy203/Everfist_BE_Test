'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class metric_values extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      metric_values.belongsTo(models.metrics, {
        foreignKey: 'metricId',
        onDelete: 'CASCADE',
      });
    }
  }
  metric_values.init({
    metricId: DataTypes.INTEGER,
    value: DataTypes.FLOAT,
    date: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'metric_values',
  });
  return metric_values;
};