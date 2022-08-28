import { Profile } from '../models/Profile';
import { Request, Response } from 'express';

export const getProfiles = async (req: Request, res: Response) => {
  const profiles = await Profile.findAll();

  res.status(200).send(profiles);
};

export const getProfile = async (req: Request, res: Response) => {
  const { profileId } = req.params;

  const profile = await Profile.findByPk(profileId);

  if (!profile) {
    return res.status(400).send({ message: 'Invalid profileId' });
  }

  res.status(200).send(profile);
};

export const updateProfile = async (req: Request, res: Response) => {
  const { profileId } = req.params;

  const { role, bio, hobbies } = req.body;

  if (!role || !bio || !hobbies) {
    return res.status(400).send({ message: 'Please provide all fields' });
  }
  const profile = await Profile.findByPk(profileId);
  if (!profile) {
    return res.status(400).send({ message: 'Invalid profileId' });
  }

  await Profile.update(
    {
      role,
      hobbies,
      bio,
    },
    { where: { profileId } }
  );

  res.status(200).send();
};
