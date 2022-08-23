import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success(`Logged in as ${email}`);
  };
  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign In</h1>

      <p className='lead'>
        <i className='fas fa-user-ninja'></i> Sign Into Your Account
      </p>

      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>

        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            minLength={6}
            name='password'
            value={password}
            onChange={onChange}
            required
          />
        </div>

        <input type='submit' value='Login' className='btn btn-primary' />
      </form>

      <p className='my-1'>
        Don't Have an Account? <Link to='/register'>Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;
