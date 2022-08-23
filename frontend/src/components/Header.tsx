import React from 'react';
import { FaFileAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>Community Noticeboard</Link>
      </h1>
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
          <a onClick={console.log} href='#!'>
            <FaSignOutAlt style={{ verticalAlign: 'middle' }} />{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
