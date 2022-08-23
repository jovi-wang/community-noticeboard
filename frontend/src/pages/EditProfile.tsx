import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';

const initialState = {
  role: '',
  hobbies: '',
  bio: '',
  twitter: '',
  facebook: '',
  instagram: '',
};

function EditProfile() {
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const { hobbies, bio, twitter, facebook, instagram, role } = formData;

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    if (!role) {
      toast.error('Please enter your role');
    } else if (!hobbies) {
      toast.error('Please enter your hobbies');
    } else {
      toast.success('Your profile is updated!');
    }
  };
  return (
    <section className='container'>
      <h1 className='large text-primary'>Edit Your Profile</h1>

      <p className='lead'>
        <i className='fas fa-user' />
        Let's get some information
      </p>

      <small>* = required field</small>

      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input type='text' name='username' value='your username' disabled />

          <small className='form-text'>This is your username</small>
        </div>

        <div className='form-group'>
          <input type='text' name='email' value='your email address' disabled />

          <small className='form-text'>This is your email address</small>
        </div>

        <div className='form-group'>
          <select name='role' onChange={onChange}>
            <option>* I am a...</option>
            <option value='Dad'>dad</option>
            <option value='Mom'>mon</option>
            <option value='Grandmom'>grandmom</option>
            <option value='Granddad'>granddad</option>
            <option value='Boy'>boy</option>
            <option value='Girl'>girl</option>
            <option value='Brother'>brother</option>
            <option value='Sister'>sister</option>
            <option value='anonymous'>Anonymous</option>
          </select>

          <small className='form-text'>
            Tell us what role do you play at home
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Hobbies'
            name='hobbies'
            value={hobbies}
            onChange={onChange}
          />

          <small className='form-text'>
            Please use comma separated your hobbies (eg.
            Gardening,Reading,Cooking,Fishing)
          </small>
        </div>

        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={onChange}
          />

          <small className='form-text'>
            Tell us a little about yourself and your family
          </small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>

          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className='form-group social-input'>
              <FaTwitter size={40} style={{ paddingRight: 10 }} />

              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className='form-group social-input'>
              <FaFacebookF size={40} style={{ paddingRight: 10 }} />
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className='form-group social-input'>
              <FaInstagram size={40} style={{ paddingRight: 10 }} />

              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={onChange}
              />
            </div>
          </>
        )}

        <input type='submit' className='btn btn-primary my-1' />

        <Link className='btn btn-light my-1' to='/'>
          Go Back
        </Link>
      </form>
    </section>
  );
}

export default EditProfile;
