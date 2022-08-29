'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      email: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      passwordHash: {
        type: Sequelize.STRING,
      },
      profileId: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('Users');
  },
};
