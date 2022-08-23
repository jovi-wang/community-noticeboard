import axios from 'axios';
import { IPost } from '../../types/interfaces';

const API_URL = '/posts';

// Create new post
const createPost = async (postData: string, token: string): Promise<IPost> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.post(API_URL, { text: postData }, config);

  return data as IPost;
};

// Get all posts
const getPosts = async (token: string): Promise<IPost[]> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await axios.get(API_URL, config);

  return data as IPost[];
};

// Delete a post
const deletePost = async (postId: string, token: string): Promise<void> => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios.delete(`${API_URL}/${postId}`, config);
};

const postService = {
  createPost,
  getPosts,
  deletePost,
};

export default postService;
