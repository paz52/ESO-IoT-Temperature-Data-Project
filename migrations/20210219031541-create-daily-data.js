'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('DailyData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cameraId: {
        type: Sequelize.INTEGER,
        references: { model: 'Cameras', key: 'id' }
      },
      time: {
        type: Sequelize.DATEONLY
      },
      average: {
        type: Sequelize.ARRAY(Sequelize.FLOAT)
      },
      max: {
        type: Sequelize.ARRAY(Sequelize.FLOAT)
      },
      min: {
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
    await queryInterface.dropTable('DailyData');
  }
};