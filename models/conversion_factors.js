'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class conversion_factors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  conversion_factors.init({
    unitFrom: DataTypes.STRING,
    unitTo: DataTypes.STRING,
    factor: DataTypes.FLOAT,
    subFactor: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'conversion_factors',
  });
  return conversion_factors;
};