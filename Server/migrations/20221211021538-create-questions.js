'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      question: {
        type: Sequelize.TEXT,
        allowNull:false,
      },
      topic: {
        type: Sequelize.STRING,
      },
      difficulty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      answers: {
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      correct: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tag: {
        type: Sequelize.STRING
      },
      bank_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'bankId',
        onDelete: 'CASCADE',
        reference: {
          model: 'questionBanks',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('questions');
  }
};