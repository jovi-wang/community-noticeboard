import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaTwitter, FaInstagram, FaFacebookF, FaCheck } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getProfile, selectProfiles } from '../features/profile/profileSlice';
import Spinner from '../components/Spinner';

const Profile = () => {
  const { id: profileId } = useParams();
  const profiles = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();
  const profile = profiles.find((p) => p.profileId === profileId);

  useEffect(() => {
    dispatch(getProfile(profileId!));
  }, [dispatch, profileId]);

  return (
    <section className='container'>
      <Link to='/profiles' className='btn btn-light'>
        Back to Profiles
      </Link>
      <Link to='/me' className='btn btn-dark'>
        Edit Profile
      </Link>
      {!profile ? (
        <Spinner />
      ) : (
        <div className='profile-grid my-1'>
          <div className='profile-top bg-primary p-2'>
            <img src={profile.avatar} alt='avatar' className='round-img my-1' />

            <h1 className='large'>{profile.name}</h1>

            <p className='lead'>{`${profile.role} at home`}</p>

            <div className='icons my-1'>
              <a href={profile.twitter || `https://www.twitter.com/`}>
                <FaTwitter size={40} />
              </a>
              <a href={profile.facebook || `https://www.facebook.com/`}>
                <FaFacebookF size={40} />
              </a>

              <a href={profile.instagram || `https://www.instagram.com/`}>
                <FaInstagram size={40} />
              </a>
            </div>
          </div>

          <div className='profile-about bg-light p-2'>
            <h2 className='text-primary'>About {profile.name}</h2>

            <p>{profile.bio}</p>

            <div className='line' />

            <h2 className='text-secondary'>Hobbies</h2>

            <div className='skills'>
              {profile.hobbies
                .split(',')
                .splice(0, 4)
                .map((hobby, index) => (
                  <div key={index} className='p-1'>
                    <FaCheck /> {hobby}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
