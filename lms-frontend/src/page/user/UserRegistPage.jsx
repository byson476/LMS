import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userApi from '../../api/userApi';
import * as responseStatusCode from '../../api/ResponseStatusCode';
import * as responseMessage from '../../api/ResponseMessage';

export const UserRegistPage = () => {
  const navigate = useNavigate();
  const writeFormRef = useRef();
  useEffect(() => {
    writeFormRef.current.userId.focus();
  }, []);
  const [user, setUser] = useState({
    userId: "",
    password: "",
    password2: "",
    name: "",
    email: ""
  });

  const handleChangeUserWriteForm = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    }
    );

  };

  const userWriteAction = async () => {
    const f = writeFormRef.current;
    if (f.userId.value === "") {
      alert("사용자 아이디를 입력하세요");
      f.userId.focus();
      return;
    }
    if (f.password.value === "") {
      alert("비밀번호를 입력하십시요.");
      f.password.focus();
      return;
    }
    if (f.password2.value === "") {
      alert("비밀번호확인을 입력하십시요.");
      f.password2.focus();
      return;
    }
    if (f.name.value === "") {
      alert("이름을 입력하십시요.");
      f.name.focus();
      return;
    }
    if (f.email.value === "") {
      alert("이메일 주소를 입력하십시요.");
      f.email.focus();
      return;
    }
    if (f.password.value !== f.password2.value) {
      alert("비밀번호와 비밀번호 확인은 일치하여야합니다.");
      f.password.focus();
      f.password.select();
      return;
    }
    const responseJsonObject = await userApi.userWriteAction(user);
    console.log(">>> UserWriteFormPage response:", responseJsonObject);
    switch (responseJsonObject.status) {
      case responseStatusCode.CREATED_USER:
        navigate(`/user_login`)
        break;
      case responseStatusCode.CREATE_FAIL_EXISTED_USER:
        setIdMessage(responseMessage.CREATE_FAIL_EXISTED_USER);
        break;
    }

  }

  return (



<div className="signup-page">
  <div className="signup-box">
    <h2 className="signup-title">회원가입</h2>

    <form
      ref={writeFormRef}
      name="f"
      method="post"
      className="signup-form"
    >
      <input
        type="text"
        placeholder="아이디"
        name="userId"
        onChange={handleChangeUserWriteForm}
        value={user.userId}
      />

      <input
        type="password"
        placeholder="비밀번호"
        name="password"
        onChange={handleChangeUserWriteForm}
        value={user.password}
      />

      <input
        type="password"
        placeholder="비밀번호 확인"
        name="password2"
        onChange={handleChangeUserWriteForm}
        value={user.password2}
      />

      <input
        type="text"
        placeholder="이름"
        name="name"
        onChange={handleChangeUserWriteForm}
        value={user.name}
      />

      <input
        type="text"
        placeholder="이메일"
        name="email"
        onChange={handleChangeUserWriteForm}
        value={user.email}
      />

      <input
        className="signup-btn"
        type="button"
        value="회원가입"
        onClick={userWriteAction}
      />
    </form>

    <div className="login-link">
      이미 계정이 있으신가요?
      <Link to={"/user_login"}> 로그인</Link>
    </div>
  </div>
</div>


  );
};

export default UserRegistPage;