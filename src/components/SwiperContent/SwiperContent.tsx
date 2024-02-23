import React, { memo } from "react";
import "./swipperContent.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { formatDateToString } from "../../Helper/DateHelper";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaRegEye, FaRocketchat } from "react-icons/fa";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { PostList } from "../../model/postModel";
import DefaultAvatar from "../../images/default_avatar.png";

interface SwiperCardProps {
  content: PostList;
  animation?: boolean;
}

export interface SwiperContentProps {
  contents: PostList[];
}

export function SwipperCard({ content, animation }: SwiperCardProps) {
  // console.log(content);
  return (
    <Link
      to={"/post/" + content.id}
      className={`swiper-card ${animation ? "animation" : "base"}`}
    >
      <div className='swiper-card-thumbnail'>
        <img src={content.thumbnail} alt='Thumbnail' />
      </div>

      <div className='swiper-card-content'>
        <div className='swiper-card-content-header'>
          <h3 className='swiper-card-content-title'>{content.title}</h3>

          <p className='swiper-card-content-excerpt'>{content.excerpt}</p>
        </div>
        <div className='swiper-card-content-stats'>
          <div className='swiper-card-content-stats-detail up'>
            <span className='swiper-card-content-stats-detail-icon'>
              <TiArrowSortedUp />
            </span>
            {content.upVote}
          </div>
          <div className='swiper-card-content-stats-detail down'>
            <span className='swiper-card-content-stats-detail-icon'>
              <TiArrowSortedDown />
            </span>
            {content.downVote}
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
          <span className='swiper-card-content-author-name'>
            <i> By {content.authorName}</i>
          </span>
          <img
            src={content.authorAvatar ?? DefaultAvatar}
            alt=''
            className='swiper-card-content-author-img'
          />
          <div className='swiper-card-content-author-info'>
            <div className='swiper-card-content-author-info-fullname'>
              {content.authorName}
            </div>
            <div className='swiper-card-content-author-info-date'>
              {formatDateToString(content.publishDate)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SwiperContent({ contents }: SwiperContentProps) {
  return (
    <div className='swiper-content'>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        centeredSlides
        grabCursor
        loop
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Pagination]}
        breakpoints={{
          1600: {
            slidesPerView: 4.5,
            spaceBetween: 20,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1212: {
            slidesPerView: 3.5,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          769: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          700: {
            slidesPerView: 3.5,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          500: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          420: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          350: {
            slidesPerView: 1.8,
            spaceBetween: 10,
          },
        }}
      >
        {contents.map((content, index) => (
          <SwiperSlide key={index}>
            <SwipperCard content={content} animation />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default memo(SwiperContent);
