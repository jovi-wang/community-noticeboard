import React from 'react';
import { FaFileAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectAuth } from '../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(selectAuth);

  const onLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Logout successfully');
  };
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>Community Noticeboard</Link>
      </h1>
      {user && (
        <ul>
          <li>
            <Link to='/posts'>
              <FaFileAlt style={{ verticalAlign: 'middle' }} />{' '}
              <span className='hide-sm'>Posts</span>
            </Link>
          </li>
          <li>
            <Link to='/profiles'>
              <FaUser style={{ verticalAlign: 'middle' }} />{' '}
              <span className='hide-sm'>Members</span>
            </Link>
          </li>
          <li>
            <a onClick={onLogout} href='#!'>
              <FaSignOutAlt style={{ verticalAlign: 'middle' }} />{' '}
              <span className='hide-sm'>Logout</span>
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Header;
