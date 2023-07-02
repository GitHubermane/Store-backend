'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('device', 'imgs',
      {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('device', 'imgs')
  }
};
