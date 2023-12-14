import React from 'react';
import './App.scss';
import CreatePost from './pages/CreatePost/CreatePost';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import TableOfContents from './components/TableOfContents/TableOfContents';
import ShowCode from './components/ShowCode/ContentDisplayer';
import BasicEditor from './components/BasicEditor/BasicEditor';
import Post from './pages/Post/Post';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#20004d',
        },
      }}>
      <div className='App'>
        <Header />
        <div className='content-wrap'>
          <Router>
            <Routes>
              <Route
                path='/post'
                element={<Post />}
              />
              <Route
                path='/create-post'
                element={<CreatePost />}
              />
              <Route
                path='/user/profile/:userId'
                element={<Profile />}
              />
              <Route
                path='/login'
                element={<Login />}
              />
              <Route
                path='*'
                element={<NotFound />}
              />
            </Routes>
          </Router>
        </div>
        <Footer />
      </div>
    </ConfigProvider>
  );
};

export default App;
