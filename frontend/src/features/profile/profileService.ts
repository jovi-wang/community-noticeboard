import axios from 'axios';
import { IProfile } from '../../types/interfaces';

const API_URL = '/api/profiles';

// Update profile
const updateProfile = async (
  profileData: IProfile,
  token: string
): Promise<void> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  await axios.put(`${API_URL}/${profileData.profileId}`, profileData, config);
};

// Get all profiles
const getProfiles = async (token: string): Promise<IProfile[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL, config);

  return data as IProfile[];
};

// Get a profile
const getProfile = async (
  profileId: string,
  token: string
): Promise<IProfile> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(`${API_URL}/${profileId}`, config);
  return data as IProfile;
};

const profileService = {
  updateProfile,
  getProfiles,
  getProfile,
};

export default profileService;
