'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'annie@gmail.com',
        profileId: 'e36cbfc3-0a72-47f8-b237-8584ba355281',
        passwordHash:
          '$2b$10$xXYBf90FQ4VQd2c.aYUElexqttjGah/oX9kU63fHbudJg77D3/YDW',
      },
      {
        email: 'lisa@gmail.com',
        profileId: '5fd5accb-675d-4348-95f7-e3e930ea0de0',
        passwordHash:
          '$2b$10$uOzQIjrI7TigXVWCGNDLSu11EwWIB86dJCTzvGWP8/TJHk7SQXO9y',
      },
      {
        email: 'arthur@gmail.com',
        profileId: '2b209909-2ae8-46c7-9707-0929b477aab9',
        passwordHash:
          '$2b$10$AEb44CvIgIVgp5n4kZSc0.Z9usYJDS6tTC.56jYxnsoUW/1hxOzXS',
      },
      {
        email: 'howard@gmail.com',
        profileId: '963731dc-7fa9-466e-8124-d72057f0f829',
        passwordHash:
          '$2b$10$4l9jci09AQLKDCt75wUz1.nIlOiUS4ATBlDRtRW8uHydwpKjyGzHa',
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
