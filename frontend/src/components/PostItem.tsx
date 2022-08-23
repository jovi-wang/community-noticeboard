import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { IPost } from '../types/interfaces';
import { useAppDispatch } from '../app/hooks';
import { deletePost } from '../features/post/postSlice';

const PostItem: React.FC<IPost> = ({
  postId,
  text,
  name,
  avatar,
  date,
  profileId,
}) => {
  const dispatch = useAppDispatch();
  const onDelete = () => {
    dispatch(deletePost(postId));
  };
  return (
    <div className='post bg-white my-1 p-1'>
      <div>
        <Link to={`/profile/${profileId}`}>
          <img src={avatar} alt='avatar' className='round-img' />

          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className='my-1'>{text}</p>

        <p className='post-date'>Posted on {date}</p>

        <button type='button' className='btn btn-danger' onClick={onDelete}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default PostItem;
