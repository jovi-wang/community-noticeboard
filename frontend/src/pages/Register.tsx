import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      toast.success(`Registered new user - ${email}`);
    }
  };
  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign Up</h1>

      <p className='lead'>
        <i className='fas fa-user-ninja'></i> Create Your Account
      </p>

      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>

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

        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            minLength={6}
            name='password2'
            value={password2}
            onChange={onChange}
            required
          />
        </div>

        <input type='submit' value='Register' className='btn btn-primary' />
      </form>

      <p className='my-1'>
        Already Have an Account? <Link to='/login'>Sign In</Link>
      </p>
    </section>
  );
};

export default Register;
