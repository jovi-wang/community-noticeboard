import express from 'express';
import { randomUUID } from 'crypto';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let posts = [
  {
    postId: 'e54c41d7-da18-409d-b4f5-de56fd4f8051',
    profileId: '2b209909-2ae8-46c7-9707-0929b477aab9',
    text: 'Can I please get some one to help me out at my backyard, just pick up the fruits and have fun!!!',
    date: '15/08/22',
  },
  {
    postId: 'dd016122-27f5-4e2e-a35d-f828f75a71b3',
    profileId: '963731dc-7fa9-466e-8124-d72057f0f829',
    text: 'Any one know a good plumber nearby, I need help on my underground pipe, and it is a possible cracked/blocked pipe in the front garden',
    date: '16/08/22',
  },
  {
    postId: 'deef84bf-4bb6-446a-abbb-0d9e933251f8',
    profileId: '5fd5accb-675d-4348-95f7-e3e930ea0de0',
    text: 'Looking for recommendations for dentist for 10 year old kids. Thanks in advance',
    date: '19/08/22',
  },
  {
    postId: 'a9157f06-1798-4a8e-9486-6fe8662e9b19',
    profileId: 'e36cbfc3-0a72-47f8-b237-8584ba355281',
    text: 'I found a lost puppy at my front door, it is a german shepherd and she is absolutely lovely, if are her owner, please contact me (202 555 0191)',
    date: '22/08/22',
  },
  {
    postId: '67001461-d440-461c-b373-aa99480ac765',
    profileId: 'e36cbfc3-0a72-47f8-b237-8584ba355281',
    text: 'We will throw a big party for our wedding, please join us for this big event. The address is 29 Ghost Hill Road in next Sunday',
    date: '24/08/22',
  },
  {
    postId: 'ae0089cc-44ad-43c5-9c22-aa63e9075c6b',
    profileId: '5fd5accb-675d-4348-95f7-e3e930ea0de0',
    text: 'Are you a parent or a carer of a child aged 0-5. Please join us for an online information session and learn about the baby first aid course',
    date: '25/08/22',
  },
];
const profiles = [
  {
    profileId: 'e36cbfc3-0a72-47f8-b237-8584ba355281',
    avatar: 'https://avatars.dicebear.com/api/female/Annie.svg?size=120',
    name: 'Annie Roden',
    hobbies: 'cooking,reading,painting,music',
    role: 'mon',
    bio: 'I am a teacher in the local primary school, I am a mother of 3 boys. I love our community, tell me something about yourself.',
  },
  {
    profileId: '5fd5accb-675d-4348-95f7-e3e930ea0de0',
    avatar: 'https://avatars.dicebear.com/api/female/Lisa.svg?size=120',
    name: 'Lisa Ray',
    hobbies: 'baking,gardening,yoga',
    role: 'grandmom',
    bio: 'I am a retied chef, and I love coking and baking, my recent hoby is yoga and gardening, very lovely to know you.',
  },
  {
    profileId: '2b209909-2ae8-46c7-9707-0929b477aab9',
    avatar: 'https://avatars.dicebear.com/api/male/Arthur.svg?size=120',
    name: 'Arthur Rembert',
    hobbies: 'hiking,running,sports',
    role: 'dad',
    bio: 'My name is Arthur, I am working as a business salesperson, I am also a dad of 2 kids, I love them very much.',
  },
  {
    profileId: '963731dc-7fa9-466e-8124-d72057f0f829',
    avatar: 'https://avatars.dicebear.com/api/male/Howard.svg?size=120',
    name: 'Howard Betton',
    hobbies: 'travel,photography',
    role: 'granddad',
    bio: 'Hi everyone, I am a writer and a freelancing a photographer, you can know more about my work by visiting my social media page.',
  },
];

app.get('/', (req, res) => {
  console.log('health check');
  res.send();
});

app.get('/profiles', (req, res) => {
  res.json(profiles);
});

app.get('/profiles/:profileId', (req, res) => {
  const { profileId } = req.params;
  res.json(profiles.find((p) => p.profileId === profileId));
});

app.put('/profiles/:profileId', (req, res) => {
  const { profileId } = req.params;
  const { role, bio, hobbies } = req.body;
  const profile = profiles.find((p) => p.profileId == profileId);
  profile.role = role;
  profile.bio = bio;
  profile.hobbies = hobbies;
  res.send();
});

app.get('/posts', (req, res) => {
  const result = posts.map((i) => {
    const profile = profiles.find((p) => p.profileId == i.profileId);
    return {
      ...i,
      avatar: profile.avatar,
      name: profile.name,
    };
  });
  res.json(result);
});

app.post('/posts', (req, res) => {
  const profileId = req.headers.authorization.split(' ')[1];
  const profile = profiles.find((p) => p.profileId == profileId);
  res.status(201).json({
    postId: randomUUID(),
    profileId,
    date: new Intl.DateTimeFormat().format(new Date()),
    text: req.body.text,
    avatar: profile.avatar,
    name: profile.name,
  });
});

app.delete('/posts/:postId', (req, res) => {
  const profileId = req.headers.authorization.split(' ')[1];
  const { postId } = req.params;
  posts = posts.filter((p) => p.postId == postId);

  res.status(200).send();
});

app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  // res.status(400).json({ message: 'invalid credential' });
  res.json({ name, email, token: 'secret' });
});

app.post('/users/login', (req, res) => {
  const { email, password } = req.body;
  // res.status(400).json({ message: 'invalid credential' });
  res.json({ name: 'Lisa Ray', email, token: 'secret' });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
