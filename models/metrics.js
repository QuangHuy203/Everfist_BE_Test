'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class metrics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      metrics.belongsTo(models.users, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
      });
      metrics.hasMany(models.metric_values, {
        foreignKey: 'metricId',
        onDelete: 'CASCADE',
      });
    }
  }
  metrics.init({
    userId: DataTypes.INTEGER,
    metricName: DataTypes.STRING,
    type: DataTypes.STRING,
    unit: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'metrics',
  });
  return metrics;
};