'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      postId: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      profileId: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.STRING,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  },
};
