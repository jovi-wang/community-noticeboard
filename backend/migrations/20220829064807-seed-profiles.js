'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Profiles', [
      {
        profileId: 'e36cbfc3-0a72-47f8-b237-8584ba355281',
        name: 'Annie Roden',
        avatar: 'https://avatars.dicebear.com/api/pixel-art/Annie.svg?size=120',
        hobbies: 'cooking,reading,painting,music',
        role: 'mom',
        bio: 'I am a teacher in the local primary school, I am a mother of 3 boys. I love our community, tell me something about yourself.',
      },
      {
        profileId: '5fd5accb-675d-4348-95f7-e3e930ea0de0',
        name: 'Lisa Ray',
        avatar: 'https://avatars.dicebear.com/api/pixel-art/Lisa.svg?size=120',
        hobbies: 'baking,gardening,yoga',
        role: 'grandmom',
        bio: 'I am a retied chef, and I love coking and baking, my recent hoby is yoga and gardening, very lovely to know you.',
      },
      {
        profileId: '2b209909-2ae8-46c7-9707-0929b477aab9',
        name: 'Arthur Rembert',
        avatar:
          'https://avatars.dicebear.com/api/pixel-art/Arthur.svg?size=120',
        hobbies: 'hiking,running,sports',
        role: 'dad',
        bio: 'My name is Arthur, I am working as a business salesperson, I am also a dad of 2 kids, I love them very much.',
      },
      {
        profileId: '963731dc-7fa9-466e-8124-d72057f0f829',
        name: 'Howard Betton',
        avatar:
          'https://avatars.dicebear.com/api/pixel-art/Howard.svg?size=120',
        hobbies: 'travel,photography',
        role: 'graddad',
        bio: 'Hi everyone, I am a writer and a freelancing a photographer, you can know more about my work by visiting my social media page.',
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('Profiles', null, {});
  },
};
