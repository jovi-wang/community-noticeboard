CREATE TABLE IF NOT EXISTS "Posts" (
  "postId" VARCHAR(255), 
  "profileId" VARCHAR(255), 
  "date" VARCHAR(255), 
  "text" VARCHAR(255), 
  PRIMARY KEY ("postId")
);

CREATE TABLE IF NOT EXISTS "Users" (
  "email" VARCHAR(255), 
  "profileId" VARCHAR(255), 
  "passwordHash" VARCHAR(255), 
  PRIMARY KEY ("email")
);

CREATE TABLE IF NOT EXISTS "Profiles" (
  "profileId" VARCHAR(255), 
  "name" VARCHAR(255), 
  "avatar" VARCHAR(255), 
  "hobbies" VARCHAR(255), 
  "role" VARCHAR(255), 
  "bio" VARCHAR(255), 
  PRIMARY KEY ("profileId")
);

DELETE FROM "Users";
DELETE FROM "Profiles";
DELETE FROM "Posts";

INSERT INTO "Users" ("email", "passwordHash", "profileId")
VALUES 
  ('annie@gmail.com', '$2b$10$xXYBf90FQ4VQd2c.aYUElexqttjGah/oX9kU63fHbudJg77D3/YDW', 'e36cbfc3-0a72-47f8-b237-8584ba355281'),
  ('lisa@gmail.com', '$2b$10$uOzQIjrI7TigXVWCGNDLSu11EwWIB86dJCTzvGWP8/TJHk7SQXO9y', '5fd5accb-675d-4348-95f7-e3e930ea0de0'),
  ('arthur@gmail.com', '$2b$10$AEb44CvIgIVgp5n4kZSc0.Z9usYJDS6tTC.56jYxnsoUW/1hxOzXS', '2b209909-2ae8-46c7-9707-0929b477aab9'),
  ('howard@gmail.com', '$2b$10$4l9jci09AQLKDCt75wUz1.nIlOiUS4ATBlDRtRW8uHydwpKjyGzHa', '963731dc-7fa9-466e-8124-d72057f0f829');


INSERT INTO "Profiles" ("profileId", "name", "avatar", "hobbies", "role", "bio")
VALUES 
  ('e36cbfc3-0a72-47f8-b237-8584ba355281', 'Annie Roden', 'https://avatars.dicebear.com/api/pixel-art/Annie.svg?size=120', 'cooking,reading,painting,music', 'mom', 'I am a teacher in the local primary school, I am a mother of 3 boys. I love our community, tell me something about yourself.'),
  ('5fd5accb-675d-4348-95f7-e3e930ea0de0', 'Lisa Ray', 'https://avatars.dicebear.com/api/pixel-art/Lisa.svg?size=120', 'baking,gardening,yoga', 'grandmom', 'I am a retied chef, and I love coking and baking, my recent hoby is yoga and gardening, very lovely to know you.'),
  ('2b209909-2ae8-46c7-9707-0929b477aab9', 'Arthur Rembert', 'https://avatars.dicebear.com/api/pixel-art/Arthur.svg?size=120', 'hiking,running,sports', 'dad', 'My name is Arthur, I am working as a business salesperson, I am also a dad of 2 kids, I love them very much.'),
  ('963731dc-7fa9-466e-8124-d72057f0f829', 'Howard Betton', 'https://avatars.dicebear.com/api/pixel-art/Howard.svg?size=120', 'travel,photography', 'graddad', 'Hi everyone, I am a writer and a freelancing a photographer, you can know more about my work by visiting my social media page.');


INSERT INTO "Posts" ("postId", "profileId", "text", "date")
VALUES 
  ('e54c41d7-da18-409d-b4f5-de56fd4f8051', '2b209909-2ae8-46c7-9707-0929b477aab9', 'Can I please get some one to help me out at my backyard, just pick up the fruits and have fun!!!',  '2022-08-10'),
  ('dd016122-27f5-4e2e-a35d-f828f75a71b3', '963731dc-7fa9-466e-8124-d72057f0f829', 'Any one know a good plumber nearby, I need help on my underground pipe, and it is a possible cracked/blocked pipe in the front garden',  '2022-08-15'),
  ('deef84bf-4bb6-446a-abbb-0d9e933251f8', '5fd5accb-675d-4348-95f7-e3e930ea0de0', 'Looking for recommendations for dentist for 10 year old kids. Thanks in advance',  '2022-08-19'),
  ('a9157f06-1798-4a8e-9486-6fe8662e9b19', 'e36cbfc3-0a72-47f8-b237-8584ba355281', 'I found a lost puppy at my front door, it is a german shepherd and she is absolutely lovely, if are her owner, please contact me (202 555 0191)',  '2022-08-22'),
  ('67001461-d440-461c-b373-aa99480ac765', 'e36cbfc3-0a72-47f8-b237-8584ba355281', 'We will throw a big party for our wedding anniversary, please join us for this big event. The address is 29 Ghost Hill Road in next Sunday',  '2022-08-25'),
  ('ae0089cc-44ad-43c5-9c22-aa63e9075c6b', '5fd5accb-675d-4348-95f7-e3e930ea0de0', 'Are you a parent or a carer of a child aged 0-5. Please join us for an online information session and learn about the baby first aid course',  '2022-08-28');