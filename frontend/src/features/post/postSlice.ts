import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';
import { RootState } from '../../app/store';
import { IPost, IUser } from '../../types/interfaces';

const initialState: { posts: IPost[] } = {
  posts: [],
};

export const createPost = createAsyncThunk(
  'posts/create',
  async (postData: string, thunkAPI) => {
    const { auth } = thunkAPI.getState() as { auth: { user: IUser } };
    return await postService.createPost(postData, auth.user.token!);
  }
);

export const getPosts = createAsyncThunk(
  'posts/getAll',
  async (_, thunkAPI) => {
    const { auth } = thunkAPI.getState() as { auth: { user: IUser } };
    return await postService.getPosts(auth.user.token!);
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (postId: string, thunkAPI) => {
    const { auth } = thunkAPI.getState() as { auth: { user: IUser } };
    await postService.deletePost(postId, auth.user.token!);
    return postId;
  }
);

export const selectPosts = (state: RootState) => state.post.posts;

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const filtered = state.posts.filter(
          (post) => post.postId !== action.payload
        );
        state.posts = filtered;
      });
  },
});

export default postSlice.reducer;
