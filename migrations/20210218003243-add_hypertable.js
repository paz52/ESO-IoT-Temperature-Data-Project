'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query("SELECT create_hypertable('page_loads', 'time');");
  },

  down: (queryInterface, Sequelize) => {
  }
};
