import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import profileService from '../profile/profileService';
import { RootState } from '../../app/store';
import { IProfile } from '../../types/interfaces';

const initialState: { profiles: IProfile[] } = {
  profiles: [],
};

export const getProfiles = createAsyncThunk('profiles/getAll', async () => {
  // const token = thunkAPI.getState().auth.user.token;
  return await profileService.getProfiles('token');
});

export const getProfile = createAsyncThunk(
  'profiles/get',
  async (id: string) => {
    // const token = thunkAPI.getState().auth.user.token;
    return await profileService.getProfile(id, 'token');
  }
);

export const updateProfile = createAsyncThunk(
  'profiles/update',
  async (profileData: IProfile) => {
    // const token = thunkAPI.getState().auth.user.token;
    await profileService.updateProfile(profileData, 'token');
    // return profileData;
  }
);

export const selectProfiles = (state: RootState) => state.profile.profiles;

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        const exist = state.profiles.find(
          (profile) => profile.profileId === action.payload.profileId
        );
        if (!exist) {
          state.profiles.push(action.payload);
        }
      });
    // .addCase(updateProfile.fulfilled, (state, action) => {
    //   const profile = state.profiles.find(
    //     (p) => p.profileId === action.payload.profileId
    //   );
    //   console.log(state.profiles);
    // });
  },
});

export default profileSlice.reducer;
