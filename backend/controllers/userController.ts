import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { User } from '../models/User';
import { Profile } from '../models/Profile';
import {
  validateEmail,
  hashPassword,
  comparePasswords,
  generateJWT,
} from '../helper';

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: 'Please provide all fields' });
  }

  if (!validateEmail(email)) {
    return res.status(400).send({ message: 'Invalid email address' });
  }
  const existingUser = await User.findByPk(email);
  if (existingUser) {
    return res.status(422).send({ message: 'User already exists.' });
  }
  const generatedHash = await hashPassword(password);

  const profileId = randomUUID();

  const [newUser, newProfile] = await Promise.all([
    new User({
      email: String(email),
      passwordHash: generatedHash,
      profileId,
    } as User),
    new Profile({
      profileId,
      name: String(name),
      avatar: `https://avatars.dicebear.com/api/pixel-art/${name}.svg?size=120`,
    } as Profile),
  ]);

  await Promise.all([newUser.save(), newProfile.save()]);
  const jwt = generateJWT(newUser);

  res.status(201).send({
    token: jwt,
    name: newProfile.name,
    email: newUser.email,
    profileId: newUser.profileId,
  });
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({ message: 'Please provide all fields' });
  }

  if (!validateEmail(email)) {
    return res.status(400).send({ message: 'Invalid email address' });
  }

  const user = await User.findByPk(email);
  if (!user) {
    return res.status(401).send({ message: 'User was not found' });
  }

  const validPassword = await comparePasswords(password, user.passwordHash);

  if (!validPassword) {
    return res.status(401).send({ message: 'Password was invalid' });
  }

  const profile = await Profile.findByPk(user.profileId);

  const jwt = generateJWT(user);
  res.status(200).send({
    token: jwt,
    email: user.email,
    name: profile.name,
    profileId: user.profileId,
  });
};
