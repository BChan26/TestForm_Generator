'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Questions.belongsTo(models.QuestionBank, {
        foreignKey: 'bankId',
        as: 'q',
        onDelete:'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Questions.init({
    question: DataTypes.TEXT,
    topic: DataTypes.STRING,
    difficulty: DataTypes.INTEGER,
    answers: DataTypes.ARRAY(DataTypes.STRING),
    correct: DataTypes.STRING,
    image: DataTypes.TEXT,
    type: DataTypes.STRING,
    tag: DataTypes.STRING,
    bank_id: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'bankId',
      onDelete: 'CASCADE',
      reference: {
        model: 'questionBanks',
        key: 'id'
      }
    }
    

  }, {
    sequelize,
    modelName: 'Questions',
    tableName:'questions'
  });
  return Questions;
};