import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../features/auth/authSlice';
import { useAppDispatch } from '../app/hooks';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
      dispatch(register({ name, email, password }))
        .unwrap()
        .then(() => {
          toast.success(`Registered new user - ${email}`);
          navigate('/');
        })
        .catch(toast.error);
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
