import React from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import PostBlockLarge from '../../components/PostBlock/PostBlockLarge/PostBlockLarge';
import './home.scss';
import FeaturedPost from '../../components/PostBlock/FeaturedPost/FeaturedPost';
import { PostBlock } from '../../model/postModel';
import TrendingPost from '../../components/PostBlock/TrendingPost/TrendingPost';
import { QuestionListModel } from '../../model/questionModel';
import { title } from '@uiw/react-md-editor';
import { queries } from '@testing-library/react';
import QuestionBlock from '../../components/QuestionBlock/QuestionBlock';

const post = {
  author: 'Nguyen Thien Sua',
  date: new Date(2023, 12, 21),
  excerpt:
    'Bored with the same boxy blogging websites? Then Design Blog website template is an all-new way of representing the daily blogs with a trendy look. Bored with the same boxy blogging websites? Then Design Blog website template is an all-new way of representing the daily blogs with a trendy look.',
  thumbnail:
    'https://dpad.fm/wiki/images/5/54/Stardew-valley-the-board-game.png',
  title: 'New mod for Stardew Valley',
  id: 'asdfasdfdasf',
};

const posts: PostBlock[] = [
  post,
  post,
  post,
  post,
  post,
  post,
  post,
  post,
  post,
];
const questions: QuestionListModel[] = [
  {
    title:
      'Use of malloc function instead of fgets for a file and an array[100000]',
    avatar: 'https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png',
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: 'Gus',
    reputation: 23,
    tags: ['c', 'malloc', 'dynamic-memory-allocation', 'fgets'],
  },
  {
    title:
      'Use of malloc function instead of fgets for a file and an array[100000]',
    avatar: 'https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png',
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: 'Gus',
    reputation: 23,
    tags: ['c', 'malloc', 'dynamic-memory-allocation', 'fgets'],
  },
  {
    title:
      'Use of malloc function instead of fgets for a file and an array[100000]',
    avatar: 'https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png',
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: 'Gus',
    reputation: 23,
    tags: ['c', 'malloc', 'dynamic-memory-allocation', 'fgets'],
  },
  {
    title:
      'Use of malloc function instead of fgets for a file and an array[100000]',
    avatar: 'https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png',
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: 'Gus',
    reputation: 23,
    tags: ['c', 'malloc', 'dynamic-memory-allocation', 'fgets'],
  },
  {
    title:
      'Use of malloc function instead of fgets for a file and an array[100000]',
    avatar: 'https://stardewvalleywiki.com/mediawiki/images/5/52/Gus.png',
    date: new Date(2023, 11, 22, 15, 43, 22),
    fullName: 'Gus',
    reputation: 23,
    tags: ['c', 'malloc', 'dynamic-memory-allocation', 'fgets'],
  },
];

function Home() {
  console.log('Home');
  return (
    <div>
      <Header />
      <div className='home'>
        <div className='home-container'>
          <h1 className='home-title'>NEW POSTS</h1>

          <div className='home-content'>
            <div className='home-content-featured'>
              <h3 className='home-content-title'>Featured Posts</h3>
              <div className='home-content-line'>
                <div className='home-content-line-left'></div>
                <div className='home-content-line-right'></div>
              </div>
              <FeaturedPost
                postMedium={post}
                postSmall1={post}
                postSmall2={post}
                postSmall3={post}
              />
              <FeaturedPost
                postMedium={post}
                postSmall1={post}
                postSmall2={post}
                postSmall3={post}
              />
            </div>
            <div className='home-content-trending'>
              <h3 className='home-content-title'>Trending</h3>
              <div className='home-content-line'>
                <div className='home-content-line-left'></div>
                <div className='home-content-line-right'></div>
              </div>
              <div className='home-content-trending-container'>
                {posts.map((post, index) => (
                  <TrendingPost
                    index={index + 1}
                    post={post}
                  />
                ))}
              </div>
            </div>
          </div>
          <PostBlockLarge post={post} />

          <h1 className='home-title'>NEW QUESTIONS</h1>
          <div className='home-question'>
            {questions.map((question, index) => (
              <QuestionBlock
                key={index}
                question={question}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
