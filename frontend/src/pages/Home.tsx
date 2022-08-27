import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectAuth } from '../features/auth/authSlice';
import { getPosts } from '../features/post/postSlice';
import { getProfiles } from '../features/profile/profileSlice';

const Home = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPosts());
    dispatch(getProfiles());
  }, [dispatch]);

  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='x-large'>Your community</h1>
          <p className='lead'>
            Our Community Noticeboard keeps you informed with what is happening
            locally.
          </p>
          <div className='buttons'>
            {user ? (
              <>
                <Link to='/profiles' className='btn btn-primary'>
                  Connect with locals...
                </Link>

                <Link to='/posts' className='btn'>
                  Share your thoughts...
                </Link>

                <Link to='/me' className='btn btn-dark'>
                  Edit my profile
                </Link>
              </>
            ) : (
              <>
                <Link to='/register' className='btn btn-primary'>
                  Sign Up
                </Link>

                <Link to='/login' className='btn'>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
