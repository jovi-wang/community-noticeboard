'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Posts', [
      {
        postId: 'e54c41d7-da18-409d-b4f5-de56fd4f8051',
        profileId: '2b209909-2ae8-46c7-9707-0929b477aab9',
        text: 'Can I please get some one to help me out at my backyard, just pick up the fruits and have fun!!!',
        date: '2022-08-10',
      },
      {
        postId: 'dd016122-27f5-4e2e-a35d-f828f75a71b3',
        profileId: '963731dc-7fa9-466e-8124-d72057f0f829',
        text: 'Any one know a good plumber nearby, I need help on my underground pipe, and it is a possible cracked/blocked pipe in the front garden',
        date: '2022-08-15',
      },
      {
        postId: 'deef84bf-4bb6-446a-abbb-0d9e933251f8',
        profileId: '5fd5accb-675d-4348-95f7-e3e930ea0de0',
        text: 'Looking for recommendations for dentist for 10 year old kids. Thanks in advancen',
        date: '2022-08-19',
      },
      {
        postId: 'a9157f06-1798-4a8e-9486-6fe8662e9b19',
        profileId: 'e36cbfc3-0a72-47f8-b237-8584ba355281',
        text: 'I found a lost puppy at my front door, it is a german shepherd and she is absolutely lovely, if are her owner, please contact me (202 555 0191)',
        date: '2022-08-22',
      },
      {
        postId: '67001461-d440-461c-b373-aa99480ac765',
        profileId: 'e36cbfc3-0a72-47f8-b237-8584ba355281',
        text: 'We will throw a big party for our wedding anniversary, please join us for this big event. The address is 29 Ghost Hill Road in next Sunday',
        date: '2022-08-25',
      },
      {
        postId: 'ae0089cc-44ad-43c5-9c22-aa63e9075c6b',
        profileId: '5fd5accb-675d-4348-95f7-e3e930ea0de0',
        text: 'Are you a parent or a carer of a child aged 0-5. Please join us for an online information session and learn about the baby first aid course',
        date: '2022-08-28',
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Posts', null, {});
  },
};
