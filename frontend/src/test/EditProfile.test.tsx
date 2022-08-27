import { render, screen, fireEvent } from '@testing-library/react';
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
describe('full app rendering/navigating to EditProfile', () => {
  test('navigate to EditProfile', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Edit my profile/i));

    expect(screen.getByText(/Edit Your Profile/i)).toBeInTheDocument();
    expect(screen.getByText("Let's get some information")).toBeInTheDocument();
  });
  test('EditProfile form type info', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('* role'), {
      target: { value: '' },
    });

    await userEvent.type(screen.getByPlaceholderText('* role'), 'mom');

    expect(screen.getByPlaceholderText('* role')).toHaveAttribute(
      'value',
      'mom'
    );

    fireEvent.change(screen.getByPlaceholderText('* Hobbies'), {
      target: { value: '' },
    });

    await userEvent.type(screen.getByPlaceholderText('* Hobbies'), 'travel');

    expect(screen.getByPlaceholderText('* Hobbies')).toHaveAttribute(
      'value',
      'travel'
    );
  });
  test('EditProfile toggle add social', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.click(screen.getByText('Add Social Network Links'));
  });

  test('Click Submit button', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'submit' }));
  });
});
