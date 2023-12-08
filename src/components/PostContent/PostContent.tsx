import React, { useState } from 'react';
import './postContent.scss';
import ContentDisplayer from '../ShowCode/ContentDisplayer';
import TableOfContents, {
  TableOfContentsData,
} from '../TableOfContents/TableOfContents';
import { SlPencil, SlUserFollow } from 'react-icons/sl';

interface PostContentProps {
  content: string;
  thumbnail: string;
  excerpt: string;
  avatar: string;
  fullname: string;
  username: string;
  date: string;
  viewCount: number;
  postCount: number;
  followCount: number;
  upvote: number;
  downvote: number;
}

function PostContent({
  content,
  thumbnail,
  excerpt,
  avatar,
  fullname,
  username,
  date,
  viewCount,
  postCount,
  followCount,
  upvote,
  downvote,
}: PostContentProps) {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsData[]>(
    []
  );

  return (
    <div className='post-content'>
      <div className='post-content-container'>
        <div className='post-content-header'>
          <div className='post-content-header-left'></div>
          <div className='post-content-header-middle'></div>
          <div className='post-content-header-right'></div>
        </div>
        <div className='post-content-body'>
          <div className='post-content-body-left'>
            <div className='post-content-body-left-header'>
              <img
                className='post-content-body-left-header-thumbnail'
                src={thumbnail}
                alt='Post Thumbnail'
              />
              <div className='post-content-body-left-header-info'>
                <div className='post-user-info'>
                  <img
                    className='avatar'
                    src={avatar}
                    alt='User Avatar'
                  />
                  <div className='post-user-details'>
                    <div className='post-user-details-name'>
                      <h2 className='fullname'>{fullname}</h2>
                      <p className='username'>@{username}</p>
                    </div>
                    <div className='post-user-details-more'>
                      <div className='post-user-details-more-post'>
                        <SlPencil />
                        <span className='post-user-details-more-post-count'>
                          {postCount}
                        </span>
                        <span className='post-user-details-more-post-label'>
                          Posts
                        </span>
                      </div>
                      <div className='post-user-details-more-follow'>
                        <SlUserFollow />
                        <span className='post-user-details-more-follow-count'>
                          {followCount}
                        </span>
                        <span className='post-user-details-more-follow-label'>
                          Followers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='stat'>
                  <span className='count'>{viewCount}</span>
                  <span className='label'>Views</span>
                </div>
                <p className='date'>{date}</p>
                <div className='post-stats'>
                  <div className='stat'>
                    <span className='count'>{upvote}</span>
                    <span className='label'>Upvotes</span>
                  </div>
                  <div className='stat'>
                    <span className='count'>{downvote}</span>
                    <span className='label'>Downvotes</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='post-content-body-left-body'>
              <ContentDisplayer
                content={content}
                setTableOfContents={setTableOfContents}
              />
            </div>
          </div>
          <div className='post-content-body-right'>
            <h3>Table of contents</h3>
            <TableOfContents heading={tableOfContents} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostContent;
