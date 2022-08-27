import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import authReducer from '../features/auth/authSlice';
import postReducer from '../features/post/postSlice';
import profileReducer from '../features/profile/profileSlice';

const store = configureStore({
  reducer: { auth: authReducer, profile: profileReducer, post: postReducer },
  preloadedState: {
    auth: {
      user: { name: 'test name', password: 'string', email: 'test@gmail.com' },
      error: '',
    },
    profile: {
      profiles: [
        {
          profileId: 'profileId',
          name: 'test name',
          avatar: 'avatar',
          hobbies: 'hobby1,hobby2',
          role: 'role',
          bio: 'short bio',
        },
      ],
    },
    post: {
      posts: [
        {
          postId: 'postId',
          text: 'text',
          name: 'test name',
          avatar: 'avatar',
          date: 'data',
          profileId: 'profileId',
        },
      ],
    },
  },
});
describe('full app rendering/navigating to profiles', () => {
  test('navigate to profiles', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Posts/i));

    expect(screen.getByText('Community Posts')).toBeInTheDocument();
    expect(screen.getByText('Say Something...')).toBeInTheDocument();
  });
});
