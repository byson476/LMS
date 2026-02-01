import { Route, Routes } from "react-router-dom";
import "./assets/css/login.css";
import "./assets/css/signup.css";

import { LoginPage } from "./page/LoginPage";
import { Signup } from "./page/Signup";
import React, { useEffect, useState } from "react";

import { userLoginCheck } from "./util/loginCheck";
import KakaoRedirectPage from "./page/KakaoRedirectPage";


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
  return (
    <>
      {/*
     2. Context객체.Provider태그로 App.jsx모든컴포넌트 포함시킴 
    */}
      <UserContext.Provider value={{
        loginStatus,
        setLoginStatus
      }}>

        <div id="wrapper">
          <div id="content">
            {/*UserContent.js start*/}
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/user_login" element={<LoginPage />} />
              <Route path="/user_signup" element={<Signup />} />
            </Routes>
            {/*UserContent.js end*/}
          </div>
        </div>
      </UserContext.Provider>
    </>
  );
}
export default App;
