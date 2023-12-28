import { ConfigProvider } from "antd";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import { loginSuccess } from "./actions/loginAction";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import CreatePost from "./pages/CreatePost/CreatePost";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import PostDetail from "./pages/PostDetail/PostDetail";
import Post from "./pages/Post/Post";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import store, { RootState } from "./store/configureStore";
import EditPost from "./pages/EditPost/EditPost";

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
      <div className="App">
        <div className="content-wrap">
          <Router>
            <Routes>
              <Route path="/post" element={<Post />} />
              <Route path="/post/:postName" element={<PostDetail />} />
              <Route path="/" element={<Home />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/edit-post/:postName" element={<EditPost />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </Router>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
