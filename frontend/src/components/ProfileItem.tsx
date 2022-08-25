import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { IProfile } from '../types/interfaces';

const ProfileItem: React.FC<IProfile> = ({
  name,
  avatar,
  profileId,
  hobbies,
  role,
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='avatar' className='round-img' />

      <div>
        <h2>{name}</h2>

        <p>{role}</p>

        <Link to={`/profile/${profileId}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>

      <ul>
        {hobbies
          .split(',')
          .slice(0, 4)
          .map((hobby, index) => (
            <li key={index} className='text-secondary'>
              <FaCheck /> {hobby}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
