'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    User.hasMany(models.QuestionBank, {
      foreignKey: 'userId',
      as: 'owner',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    }
  }
  User.init({
    username: DataTypes.STRING,
    passwordDigest: DataTypes.STRING,
    tests:DataTypes.ARRAY(DataTypes.JSON),
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  });
  return User;
};