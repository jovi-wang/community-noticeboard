import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import postService from './postService';
import { RootState } from '../../app/store';
import { IPost, IProfile } from '../../types/interfaces';

const initialState: { posts: IPost[] } = {
  posts: [],
};

export const createPost = createAsyncThunk(
  'posts/create',
  async (postData: string, thunkAPI) => {
    const token = thunkAPI.getState() as { profile: { profiles: IProfile[] } };
    return await postService.createPost(
      postData,
      token.profile.profiles[0].profileId
    );
  }
);

export const getPosts = createAsyncThunk('posts/getAll', async () => {
  // const token = thunkAPI.getState().auth.user.token;
  return await postService.getPosts('token');
});

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (postId: string) => {
    // const token = thunkAPI.getState().auth.user.token;
    await postService.deletePost(postId, 'token');
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
