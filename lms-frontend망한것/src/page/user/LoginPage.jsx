import { useContext, useRef, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import * as userApi from "../api/userApi";
import * as ResponseStatusCode from "../api/ResponseStatusCode";
import * as ResponseMessage from "../api/ResponseMessage";
import { UserContext } from '../App';
import { setCookie } from "../util/cookieUtil";
import KakaoLoginComponent from "../component/KakaoLoginComponent";
import useLoginForm from "../hook/useLoginForm";

export const LoginPage = () => {
  const { loginFormRef, user, handleChangeLoginForm, message, userLoginAction } = useLoginForm();
  return (
<div className="login-page">
  <div className="login-box">
        <h2 className="login-title">LMS 로그인</h2>

        <form ref={loginFormRef} name="f" method="post" >
          <div className="form-group">
            <label>아이디</label>
            <input type="text" name="userId" placeholder="아이디 입력" onChange={handleChangeLoginForm}/>
            &nbsp;&nbsp;
            <font color="red" id="idMessage">
              {message.id}
            </font>
          </div>

          <div className="form-group">
            <label>비밀번호</label>
            <input type="password" name="password" placeholder="비밀번호 입력" onChange={handleChangeLoginForm}/>
            &nbsp;&nbsp;
            <font color="red" id="passwordMessage">
              {message.password}
            </font>
          </div>
          <input  className="login-btn"
            type="button"
            value="로그인"
            onClick={userLoginAction}
          />
        </form>

        <div className="login-footer">
          <Link to={"/user_regist"}>회원가입 </Link>
          <span>|</span>
          <a href="#">비밀번호 찾기</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
