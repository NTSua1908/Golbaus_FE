import React from 'react';
import './swipperContent.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { formatDateToString } from '../../Helper/DateHelper';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { FaRegEye, FaRocketchat } from 'react-icons/fa';

export interface SwiperCardContent {
  thumbnail: string;
  title: string;
  excerpt: string;
  upvote: number;
  downvote: number;
  viewCount: number;
  authorName: string;
  authorAvatar: string;
  commentCount: number;
  date: Date;
}

interface SwiperCardProps {
  content: SwiperCardContent;
}

export interface SwiperContentProps {
  contents: SwiperCardContent[];
}

function SwipperCard({ content }: SwiperCardProps) {
  return (
    <div className='swiper-card'>
      <img
        src={content.thumbnail}
        alt='Thumbnail'
        className='swiper-card-thumbnail'
      />
      <div className='swiper-card-content'>
        <h3 className='swiper-card-content-title'>{content.title}</h3>
        <p className='swiper-card-content-excerpt'>{content.excerpt}</p>
        <div className='swiper-card-content-stats'>
          <div className='swiper-card-content-stats-detail up'>
            <span className='swiper-card-content-stats-detail-icon'>
              <TiArrowSortedUp />
            </span>
            {content.upvote}
          </div>
          <div className='swiper-card-content-stats-detail down'>
            <span className='swiper-card-content-stats-detail-icon'>
              <TiArrowSortedDown />
            </span>
            {content.downvote}
          </div>
          <div className='swiper-card-content-stats-detail view'>
            <span className='swiper-card-content-stats-detail-icon'>
              <FaRegEye />
            </span>
            {content.viewCount}
          </div>
          <div className='swiper-card-content-stats-detail comments'>
            <span className='swiper-card-content-stats-detail-icon'>
              <FaRocketchat />
            </span>
            {content.commentCount}
          </div>
        </div>
        <div className='swiper-card-content-author'>
          <img
            src={content.authorAvatar}
            alt=''
            className='swiper-card-content-author-img'
          />
          <div className='swiper-card-content-author-info'>
            <div className='swiper-card-content-author-info-fullname'>
              {content.authorName}
            </div>
            <div className='swiper-card-content-author-info-date'>
              {formatDateToString(content.date)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SwiperContent({ contents }: SwiperContentProps) {
  return (
    <div>
      <Swiper
        spaceBetween={50}
        slidesPerView='auto'
        centeredSlides
        grabCursor>
        {contents.map((content, index) => (
          <SwiperSlide key={index}>
            <SwipperCard content={content} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperContent;
