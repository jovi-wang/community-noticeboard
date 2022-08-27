import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';
import { RootState } from '../../app/store';
import { IUser, IError } from '../../types/interfaces';

const localUser = localStorage.getItem('user');
const user = localUser ? JSON.parse(localUser) : undefined;

const initialState: { user: IUser | undefined; error: string } = {
  user,
  error: '',
};

export const register = createAsyncThunk(
  'auth/register',
  async (postData: IUser, thunkAPI) => {
    try {
      return await authService.register(postData);
    } catch (error) {
      const typedError = error as IError;
      return thunkAPI.rejectWithValue(typedError.response?.data?.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (postData: IUser, thunkAPI) => {
    try {
      return await authService.login(postData);
    } catch (error) {
      const typedError = error as IError;
      return thunkAPI.rejectWithValue(typedError.response?.data?.message);
    }
  }
);

export const selectAuth = (state: RootState) => state.auth;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      authService.logout();
      state.user = undefined;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = '';
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
