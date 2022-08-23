import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
type Props = {
  avatar: string;
  name: string;
  profileId: string;
  hobbies: string[];
  role: string;
};
const ProfileItem: React.FC<Props> = ({
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
        {hobbies.slice(0, 4).map((hobby, index) => (
          <li key={index} className='text-secondary'>
            <FaCheck /> {hobby}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
