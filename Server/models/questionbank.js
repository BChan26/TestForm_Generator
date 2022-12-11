'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionBank extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuestionBank.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'owner',
        onDelete:'CASCADE',
        onUpdate: 'CASCADE'
      }),
      QuestionBank.hasMany(models.Questions, {
        foreignKey: 'bankId',
        as: 'q',
        onDelete:'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  QuestionBank.init({
    title: DataTypes.STRING,
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
    modelName: 'QuestionBank',
    tableName:'questionBanks'
  });
  return QuestionBank;
};