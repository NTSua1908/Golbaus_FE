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
import ConfirmEmail from "./pages/ConfirmEmail/ConfirmEmail";
import RegisterSuccess from "./pages/RegisterSuccess/RegisterSuccess";
import Search from "./pages/Search/Search";
import QuestionDetail from "./pages/QuestionDetail/QuestionDetail";
import Question from "./pages/Question/Question";
import CreateQuestion from "./pages/CreateQuestion/CreateQuestion";
import EditQuestion from "./pages/EditQuestion/EditQuestion";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId =
  "672779961311-gndtddba3c43p77oqhhkp4d99qpjhnck.apps.googleusercontent.com";
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
    <GoogleOAuthProvider clientId={clientId}>
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
                <Route path='/Question' element={<Question />} />
                <Route
                  path='/question/:questionId'
                  element={<QuestionDetail />}
                />
                <Route path='/' element={<Home />} />
                <Route path='/create-post' element={<CreatePost />} />
                <Route path='/edit-post/:postId' element={<EditPost />} />
                <Route path='/create-question' element={<CreateQuestion />} />
                <Route
                  path='/edit-question/:questionId'
                  element={<EditQuestion />}
                />
                <Route path='/profile' element={<MyProfile />} />
                <Route path='/user/:userId' element={<UserProfile />} />
                <Route path='*' element={<NotFound />} />
                <Route path='/login' element={<Login />} />
                <Route
                  path='/ResetPassword/:token/:email'
                  element={<ResetPassword />}
                />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/register' element={<Register />} />
                <Route path='/checkEmail' element={<RegisterSuccess />} />
                <Route
                  path='/checkEmail/:emailResend'
                  element={<RegisterSuccess />}
                />
                <Route
                  path='/ConfirmEmail/:token/:email'
                  element={<ConfirmEmail />}
                />
                <Route path='/search' element={<Search />} />
              </Routes>
            </Router>
          </div>
        </div>
      </ConfigProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
