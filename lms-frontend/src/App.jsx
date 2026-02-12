import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./assets/css/layout.css";
import "./assets/css/styles.css";
import "./assets/css/login.css";
import "./assets/css/signup.css";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Navigation from "./layout/Navigation";

import UserProvider from "./context/UserProvider";

import UserMainPage from "./page/user/UserMainPage.jsx";
import { UserRegistPage } from "./page/user/UserRegistPage";
import { LoginPage } from "./page/user/LoginPage";
import { UserViewPage } from "./page/user/UserViewPage";
import { UserEditPage } from "./page/user/UserEditPage";
import { UserNonPage } from "./page/user/UserNonePage";
import KakaoRedirectPage from "./page/user/KakaoRedirectPage";

import  StudentCourseListPage  from "./page/course/StudentCourseList.jsx";
import  TutorCourseListPage  from "./page/course/TutorCourseList.jsx";
import TutorStudentListPage from "./page/course/TutorStudentList.jsx";
import AdminCourseListPage from "./page/course/AdminCourseList.jsx";

import { userLoginCheck } from "./util/loginCheck";

/******** Context ********/
export const UserContext = React.createContext({});

function App() {
  const [loginStatus, setLoginStatus] = useState({
    isLogin: false,
    loginUser: {},
  });

  useEffect(() => {
    const { isLogin, member } = userLoginCheck();
    setLoginStatus({
      isLogin,
      loginUser: member,
    });
  }, []);

  return (
    <UserContext.Provider value={{ loginStatus, setLoginStatus }}>
      <Header />

      <div id="wrapper">
        <Navigation />

        <div id="content">
          <Routes>
            {/* 🔐 인증 관련 */}
            <Route
              path="/user_login"
              element={!loginStatus.isLogin ? <LoginPage /> : <UserMainPage />}
            />
            <Route
              path="/user_regist"
              element={!loginStatus.isLogin ? <UserRegistPage /> : <UserMainPage />}
            />

            {/* 🏠 메인 */}
            <Route path="/" element={<UserMainPage />} />
            <Route path="/user_main" element={<UserMainPage />} />

            {/* 👤 사용자 */}
            <Route
              path="/user_view/:userId"
              element={loginStatus.isLogin ? <UserViewPage /> : <LoginPage />}
            />
            <Route
              path="/user_edit/:userId"
              element={loginStatus.isLogin ? <UserEditPage /> : <LoginPage />}
            />

            {/*학생 - 수강 강의 목록*/}
            <Route
              path="/student_course_list/:userId"
              element={loginStatus.isLogin ? <StudentCourseListPage /> : <LoginPage />}
            />
            {/*강사 - 강의 목록*/}
            <Route
              path="/tutor_course_list/:userId"
              element={loginStatus.isLogin ? <TutorCourseListPage /> : <LoginPage />}
            />
            {/*
            <Route
              path="/tutor_student_list/:courseId"
              element={loginStatus.isLogin ? <TutorStudentListPage /> : <LoginPage />}
            />
* */}
            <Route
              path="/tutor_student_list/:courseId"
              element= {<TutorStudentListPage />}
            />
            {/*관리자 - 강의 목록*/}
            <Route
              path="/admin_course_list"
              element= {<AdminCourseListPage />}
            />

            {/* 🔗 카카오 */}
            <Route path="/member/kakao" element={<KakaoRedirectPage />} />

            {/* ❌ 404 */}
            <Route path="*" element={<UserNonPage />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </UserContext.Provider>
  );
}

export default App;
