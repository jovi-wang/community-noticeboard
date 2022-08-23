import React, { useEffect } from 'react';
import ProfileItem from '../components/ProfileItem';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getProfiles, selectProfiles } from '../features/profile/profileSlice';

const Profiles = () => {
  const profiles = useAppSelector(selectProfiles);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  return (
    <section className='container'>
      <h1 className='large text-primary'>Community Members</h1>

      <p className='lead'>
        <i className='fas fa-laptop-code'></i> Browse and Connect with locals
      </p>

      <div className='profiles'>
        {profiles.length > 0 ? (
          profiles.map(({ profileId, avatar, name, hobbies, role }) => (
            <ProfileItem
              key={profileId}
              profileId={profileId}
              avatar={avatar}
              name={name}
              role={role}
              hobbies={hobbies}
            />
          ))
        ) : (
          <h4>No Profiles found...</h4>
        )}
      </div>
    </section>
  );
};

export default Profiles;
