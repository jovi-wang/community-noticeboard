import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: { auth: authReducer },
});
describe('full app rendering/navigating to Login', () => {
  test('navigate to Login', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Login/i));

    expect(screen.getByText('Sign In')).toBeInTheDocument();
    expect(screen.getByText(/Sign Into Your Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Don't Have an Account?/i)).toBeInTheDocument();

    expect(screen.getByText(/Login/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText('Email Address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });
  test('Login form type info', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    await userEvent.type(
      screen.getByPlaceholderText('Email Address'),
      'email@gmail.com'
    );

    expect(screen.getByPlaceholderText('Email Address')).toHaveAttribute(
      'value',
      'email@gmail.com'
    );

    await userEvent.type(
      screen.getByPlaceholderText('Password'),
      'test-password'
    );

    expect(screen.getByPlaceholderText('Password')).toHaveAttribute(
      'value',
      'test-password'
    );
  });
  test('Click Login button', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    // await userEvent.click(screen.getByText(/Login/i));
    await userEvent.click(screen.getByText('Login'));
  });
});
