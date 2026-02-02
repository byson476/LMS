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

import { UserMainPage } from "./page/UserMainPage";
import { UserRegistPage } from "./page/UserRegistPage";
import { LoginPage } from "./page/LoginPage";
import { UserViewPage } from "./page/UserViewPage";
import { UserEditPage } from "./page/UserEditPage";
import { UserNonPage } from "./page/UserNonePage";
import KakaoRedirectPage from "./page/KakaoRedirectPage";
import { CourseList } from "./page/course/CourseList";

import { userLoginCheck } from "./util/loginCheck";

/* =====================
   User Context
===================== */
export const UserContext = React.createContext({});

function App() {
  const location = useLocation();

  const [loginStatus, setLoginStatus] = useState({
    isLogin: false,
    loginUser: {}
  });

  /* 로그인 상태 체크 */
  useEffect(() => {
    const { isLogin, member } = userLoginCheck();
    setLoginStatus({
      isLogin,
      loginUser: member
    });
  }, []);

  /* 로그인 / 회원가입 페이지 */
  const isAuthPage =
    location.pathname === "/user_login" ||
    location.pathname === "/user_regist";

  return (
    <UserContext.Provider value={{ loginStatus, setLoginStatus }}>
      {/* ⭐ 전체 화면 기준 */}
      <div className="app-layout">
        {isAuthPage ? (
          /* =====================
             로그인 / 회원가입 전용
          ===================== */
          <Routes>
            <Route
              path="/user_login"
              element={!loginStatus.isLogin ? <LoginPage /> : <UserMainPage />}
            />
            <Route
              path="/user_regist"
              element={!loginStatus.isLogin ? <UserRegistPage /> : <UserMainPage />}
            />
          </Routes>
        ) : (
          /* =====================
             일반 페이지 레이아웃
          ===================== */
          <>
            <Header />

            <div className="body-layout">
              <Navigation />

              {/* ⭐ 여기만 스크롤 */}
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<UserMainPage />} />
                  <Route path="/user_main" element={<UserMainPage />} />

                  <Route
                    path="/user_view/:userId"
                    element={loginStatus.isLogin ? <UserViewPage /> : <UserMainPage />}
                  />

                  <Route
                    path="/user_edit/:userId"
                    element={loginStatus.isLogin ? <UserEditPage /> : <UserMainPage />}
                  />

                  <Route
                    path="/course_list/:userId"
                    element={loginStatus.isLogin ? <CourseList /> : <UserMainPage />}
                  />

                  <Route path="/member/kakao" element={<KakaoRedirectPage />} />
                  <Route path="*" element={<UserNonPage />} />
                </Routes>
              </main>
            </div>

            <Footer />
          </>
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
