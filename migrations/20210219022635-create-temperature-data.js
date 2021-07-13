'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TemperatureData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: false,
        type: Sequelize.INTEGER
      },
      cameraId: {
        type: Sequelize.INTEGER,
        references: { model: 'Cameras', key: 'id' }
      },
      time: {
        type: Sequelize.DATE
      },
      data: {
        type: Sequelize.ARRAY(Sequelize.FLOAT)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TemperatureData');
  }
};