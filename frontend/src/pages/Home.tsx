import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
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
            {/* <Link to='/register' className='btn btn-primary'>
              Sign Up
            </Link>

            <Link to='/login' className='btn'>
              Login
            </Link> */}

            <Link to='/profiles' className='btn btn-primary'>
              Connect with locals...
            </Link>

            <Link to='/posts' className='btn'>
              Share your thoughts...
            </Link>

            <Link to='/me' className='btn btn-dark'>
              Edit my profile
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
