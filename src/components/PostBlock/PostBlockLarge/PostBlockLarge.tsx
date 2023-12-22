import React from 'react';
import { PostBlock } from '../../../model/postModel';
import { formatDateToString } from '../../../Helper/DateHelper';
import PostBlockProps from '../PostBlockProps';
import './postBlockLarge.scss';
import { Link } from 'react-router-dom';

function PostBlockLarge({ post }: PostBlockProps) {
  return (
    <Link
      to={`/post/${post.title}}`}
      state={{ id: post.id }}
      className='post-block-large'>
      <div className='post-block-large-left'>
        <img
          src={post.thumbnail}
          alt={post.title}
          className='post-block-large-left-img'
        />
      </div>
      <div className='post-block-large-right'>
        <h3 className='post-block-large-right-title'>{post.title}</h3>
        <p className='post-block-large-right-excerpt'>{post.excerpt}</p>
        <p className='post-block-large-right-info'>
          <i>By</i>{' '}
          <span className='post-block-large-right-info-auth'>
            {post.author}
          </span>{' '}
          <br />
          <span className='post-block-large-right-info-date'>
            {formatDateToString(post.date)}
          </span>
        </p>
      </div>
    </Link>
  );
}

export default PostBlockLarge;
