'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Test extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Test.belongsTo(models.User,{
        foreignKey: 'userId',
        as: 'owner',
        onDelete:'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Test.init({
    title: DataTypes.STRING,
    document: DataTypes.TEXT,
    user_id: {
      type: DataTypes.STRING,
      allowNull:false,
      field: 'userId',
      onDelete: 'CASCADE',
      reference: {
        model:'users',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Test',
    tableName:'tests'
  });
  return Test;
};