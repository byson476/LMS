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

import { UserMainPage } from "./page/UserMainPage";
import { UserRegistPage } from "./page/UserRegistPage";
import { LoginPage } from "./page/LoginPage";
import { UserViewPage } from "./page/UserViewPage";
import { UserEditPage } from "./page/UserEditPage";
import { UserNonPage } from "./page/UserNonePage";
import KakaoRedirectPage from "./page/KakaoRedirectPage";
import { CourseList } from "./page/course/CourseList";

import { userLoginCheck } from "./util/loginCheck";

export const LmsGlobalCommonContext = React.createContext({});

function App() {
  const location = useLocation();
  const [loginStatus, setLoginStatus] = useState({ isLogin: false, loginUser: {} });

  useEffect(() => {
    const { isLogin, member } = userLoginCheck();
    setLoginStatus({ isLogin, loginUser: member });
  }, []);

  const isAuthPage = location.pathname === "/user_login" || location.pathname === "/user_regist";

  return (
    <UserProvider>
    <LmsGlobalCommonContext.Provider value={{ loginStatus, setLoginStatus  }}>
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
                <Route path="/course_list/:userId" element={loginStatus.isLogin ? <CourseList /> : <UserMainPage />} />
                <Route path="/member/kakao" element={<KakaoRedirectPage />} />
                <Route path="*" element={<UserNonPage />} />
              </Routes>
            </div>
          </div>

          <Footer />
        </>
      )}
    </LmsGlobalCommonContext.Provider>
    </UserProvider>
  );
}

export default App;
