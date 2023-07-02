'use strict';

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user', 'name',
      {
        type: DataTypes.STRING,
        allowNull: true,
      }
    )
    await queryInterface.addColumn('user', 'img',
      {
        type: DataTypes.STRING,
        allowNull: true,
      }
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('user', 'name')
    await queryInterface.removeColumn('user', 'img')
  }

}