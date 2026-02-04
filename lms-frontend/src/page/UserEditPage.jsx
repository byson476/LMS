import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as userApi from '../api/userApi';
import * as ResponseStatusCode from '../api/ResponseStatusCode';
import { LmsGlobalCommonContext } from "../App";
import { removeCookie } from "../util/cookieUtil";
export const UserEditPage = () => {
  const { loginStatus, setLoginStatus } = useContext(LmsGlobalCommonContext);
  const navigate = useNavigate();
  const modifyFormRef = useRef();
  const { userId } = useParams();
  const [user, setUser] = useState({
    userId: "",
    password: "",
    password2: "",
    name: "",
    email: ""
  });

  useEffect(() => {
    (async () => {
      let responseJsonObject = await userApi.userView(userId);
      switch (responseJsonObject.status) {
        case ResponseStatusCode.READ_USER:
          setUser(
            {
              ...responseJsonObject.data,
              password: "",
              password2: ""
            });
          break;
        case ResponseStatusCode.ERROR_ACCESSDENIED:
          alert(responseJsonObject.message);
          navigate(`/user_modify_form/${loginStatus.loginUser.userId}`);
          break;
        case ResponseStatusCode.ERROR_ACCESS_TOKEN:
        case ResponseStatusCode.ERROR_NOT_FOUND_ACCESS_TOKEN:
        case ResponseStatusCode.ERROR_EXPIRED_TOKEN:
          alert(responseJsonObject.message);
          setLoginStatus({
            isLogin: false,
            loginUser: {}
          });
          removeCookie("member");
          window.location.href = "/";
          break;
      }
    })();
  }, [userId]);



  const onChangeUserModifyForm = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const userModifyAction = () => {
    const f = modifyFormRef.current;

    if (f.password.value === '') {
      alert('비밀번호를 입력하세요');
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

    userApi.userModifyAction(user).then((responseJsonObject) => {
      switch (responseJsonObject.status) {
        case ResponseStatusCode.UPDATE_USER:
          navigate(`/user_view/${responseJsonObject.data.userId}`);
          break;
        case ResponseStatusCode.UPDATE_FAIL_PASSWORD_MISMATCH_USER:
          alert(responseJsonObject.message);
          break;
        case ResponseStatusCode.UNAUTHORIZED_USER:
          alert(responseJsonObject.message);
          break;
        case ResponseStatusCode.ERROR_ACCESSDENIED:
          alert(responseJsonObject.message);
          break;
        case ResponseStatusCode.ERROR_ACCESS_TOKEN:
          alert(responseJsonObject.message);
          break;
      }
    });

  };
  return (
<div className="user-modify-page">
  <div className="user-modify-box">
    <h2>사용자 수정</h2>
    <form ref={modifyFormRef} name="f">
      <table>
        <tbody>
          <tr>
            <td>아이디</td>
            <td>{user.userId}</td>
          </tr>
          <tr>
            <td>비밀번호</td>
            <td>
              <input type="password" name="password" value={user.password} onChange={onChangeUserModifyForm} />
            </td>
          </tr>
          <tr>
            <td>비밀번호 확인</td>
            <td>
              <input type="password" name="password2" value={user.password2} onChange={onChangeUserModifyForm} />
            </td>
          </tr>
          <tr>
            <td>이름</td>
            <td>
              <input type="text" name="name" value={user.name} onChange={onChangeUserModifyForm} />
            </td>
          </tr>
          <tr>
            <td>이메일</td>
            <td>
              <input type="text" name="email" value={user.email} onChange={onChangeUserModifyForm} />
            </td>
          </tr>
        </tbody>
      </table>
      <input type="button" value="수정" onClick={userModifyAction} />
    </form>
  </div>
</div>

  );
};
