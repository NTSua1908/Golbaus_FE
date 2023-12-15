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
import ResetPassword from './pages/ResetPassword/ResetPassword';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';

const App = () => {
  const hideHeaderFooterRoutes = [
    '/login',
    '/reset-password',
    '/forgot-password',
    '/register',
  ];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    window.location.pathname
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#20004d',
        },
      }}>
      <div className='App'>
        {!shouldHideHeaderFooter && <Header />}
        <div
          className={`content-wrap ${shouldHideHeaderFooter && 'no-padding'}`}>
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
                path='*'
                element={<NotFound />}
              />
              <Route
                path='/login'
                element={<Login />}
              />
              <Route
                path='/reset-password'
                element={<ResetPassword />}
              />
              <Route
                path='/forgot-password'
                element={<ForgotPassword />}
              />
              <Route
                path='/register'
                element={<Register />}
              />
            </Routes>
          </Router>
        </div>
        {!shouldHideHeaderFooter && <Footer />}
      </div>
    </ConfigProvider>
  );
};

export default App;
