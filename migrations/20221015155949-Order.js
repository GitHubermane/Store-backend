'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('order', 'adress',
      {
        type: DataTypes.STRING,
        allowNull: true,
      }
    )
    await queryInterface.addColumn('order', 'status',
      {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'in process'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('order', 'adress')
    await queryInterface.removeColumn('order', 'status')
  }
};
