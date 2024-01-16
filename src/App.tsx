import { ConfigProvider } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import { loginSuccess } from "./actions/loginAction";
import CreatePost from "./pages/CreatePost/CreatePost";
import EditPost from "./pages/EditPost/EditPost";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import Post from "./pages/Post/Post";
import PostDetail from "./pages/PostDetail/PostDetail";
import MyProfile from "./pages/Profile/MyProfile";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import UserProfile from "./pages/UserProfile/UserProfile";
import Search from "./pages/Search/Search";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!isAuthenticated) {
    const token = localStorage.getItem("token");
    if (token !== null) {
      dispatch(loginSuccess());
    }
    console.log("Dispatch");
    // }
  }, []);

  // console.log('APP');

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#20004d",
        },
      }}
    >
      <div className='App'>
        <div className='content-wrap'>
          <Router>
            <Routes>
              <Route path='/post' element={<Post />} />
              <Route path='/post/:postId' element={<PostDetail />} />
              <Route path='/' element={<Home />} />
              <Route path='/create-post' element={<CreatePost />} />
              <Route path='/edit-post/:postId' element={<EditPost />} />
              <Route path='/profile' element={<MyProfile />} />
              <Route path='/user/:userId' element={<UserProfile />} />
              <Route path='*' element={<NotFound />} />
              <Route path='/login' element={<Login />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/register' element={<Register />} />
              <Route path='/search' element={<Search />} />
            </Routes>
          </Router>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
