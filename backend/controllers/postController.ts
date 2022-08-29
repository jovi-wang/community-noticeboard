import { Post } from '../models/Post';
import { Profile } from '../models/Profile';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { extractProfileIdFromJWT } from '../helper';

export const getPosts = async (req: Request, res: Response) => {
  const posts = await Post.findAll();
  const profiles = await Profile.findAll();
  const resData = posts.map((p) => {
    const profile = profiles.find((i) => i.profileId === p.profileId);
    return {
      profileId: p.profileId,
      postId: p.postId,
      text: p.text,
      date: p.date,
      name: profile.name,
      avatar: profile.avatar,
    };
  });
  res.status(200).send(resData);
};

export const deletePost = async (req: Request, res: Response) => {
  const { postId } = req.params;
  await Post.destroy({ where: { postId } });
  res.status(200).send();
};

export const createPost = async (req: Request, res: Response) => {
  const { text, date } = req.body;
  if (!text || !date) {
    return res.status(400).send({ message: 'Please provide all fields' });
  }
  const jwt = req.headers.authorization.split(' ')[1];
  const profileId = extractProfileIdFromJWT(jwt);

  const profile = await Profile.findByPk(profileId);
  if (!profile) {
    return res.status(400).send({ message: 'Invalid auth token' });
  }
  const postId = randomUUID();

  await Post.create({
    profileId,
    postId,
    date,
    text,
  });
  res.status(200).send({
    profileId,
    postId,
    text,
    date,
    avatar: profile.avatar,
    name: profile.name,
  });
};
