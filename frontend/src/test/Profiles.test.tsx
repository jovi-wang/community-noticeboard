import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';

const store = configureStore({
  reducer: { auth: authReducer, profile: profileReducer },
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
  },
});
describe('full app rendering/navigating to profiles', () => {
  test('navigate to profiles', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Members/i));

    expect(screen.getByText('Community Members')).toBeInTheDocument();
    expect(
      screen.getByText('Browse and Connect with locals')
    ).toBeInTheDocument();
    await userEvent.click(screen.getByText(/View Profile/i));
  });
});
