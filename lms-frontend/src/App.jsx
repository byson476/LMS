import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import "./assets/css/layout.css";
import "./assets/css/styles.css";
import "./assets/css/login.css";
import "./assets/css/signup.css";
import "./assets/css/course.css";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Navigation from "./layout/Navigation"; 

import UserProvider from './context/UserProvider';

import  UserMainPage  from "./page/user/UserMainPage.jsx";
import { UserRegistPage } from "./page/user/UserRegistPage";
import { LoginPage } from "./page/user/LoginPage";
import { UserViewPage } from "./page/user/UserViewPage";
import { UserEditPage } from "./page/user/UserEditPage";
import { UserNonPage } from "./page/user/UserNonePage";
import KakaoRedirectPage from "./page/user/KakaoRedirectPage";
import { CourseListStudent } from "./page/course/CourseListStudent";

import { userLoginCheck } from "./util/loginCheck";

/********1.초기값이 {} 인 Context객체생성후 App.jsx 에서 export */
export const UserContext = React.createContext({});

function App() {
  const [loginStatus, setLoginStatus] = useState(
    {
      isLogin: false,
      loginUser: {}
    }
  );
  useEffect(() => {
    (async () => {
      const { isLogin, member } = userLoginCheck();
      console.log("userLoginCheck:", isLogin, member)
      setLoginStatus({
        isLogin: isLogin,
        loginUser: member
      });
    })();
  }, []);
  console.log(">>> App.jsx update")
  console.log(">>> App.jsx loginStatus:", loginStatus);

  const isAuthPage = location.pathname === "/user_login" || location.pathname === "/user_regist";

  return (
    <UserContext.Provider value={{ loginStatus, setLoginStatus  }}>
      {isAuthPage ? (
        <div className="auth-layout">
          <Routes>
            <Route path="/user_login" element={!loginStatus.isLogin ? <LoginPage /> : <UserMainPage />} />
            <Route path="/user_regist" element={!loginStatus.isLogin ? <UserRegistPage /> : <UserMainPage />} />
          </Routes>
        </div>
      ) : (
        <>
          <Header />

          {/* 🔥 좌우 레이아웃: Navigation + Content */}
          <div id="wrapper">
            <Navigation id="navigation" />
            <div id="content">
              <Routes>
                <Route path="/" element={<UserMainPage />} />
                <Route path="/user_main" element={<UserMainPage />} />
                <Route path="/user_view/:userId" element={loginStatus.isLogin ? <UserViewPage /> : <UserMainPage />} />
                <Route path="/user_edit/:userId" element={loginStatus.isLogin ? <UserEditPage /> : <UserMainPage />} />
                <Route path="/course_list/:userId" element={loginStatus.isLogin ? <CourseListStudent /> : <UserMainPage />} />
                <Route path="/member/kakao" element={<KakaoRedirectPage />} />
                <Route path="*" element={<UserNonPage />} />
              </Routes>
            </div>
          </div>

          <Footer />
        </>
      )}
    </UserContext.Provider>
  );
}

export default App;
