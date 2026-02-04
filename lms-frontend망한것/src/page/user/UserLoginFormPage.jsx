import { useContext, useRef, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import * as userApi from "../api/userApi";
import * as ResponseStatusCode from "../api/ResponseStatusCode";
import * as ResponseMessage from "../api/ResponseMessage";
import { UserContext } from '../App';
import { setCookie } from "../util/cookieUtil";
import KakaoLoginComponent from "../component/KakaoLoginComponent";
import useLoginForm from "../hook/useLoginForm";

export const UserLoginFormPage = () => {
  const { loginFormRef, user, handleChangeLoginForm, message, userLoginAction } = useLoginForm();
  /*
  const { loginStatus, setLoginStatus } = useContext(UserContext);
  const loginFormRef = useRef();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userId: "",
    password: "",
    name: "",
    email: ""
  });
  const [message, setMessage] = useState({
    id: "",
    password: ""
  });
  const handleChangeLoginForm = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  }
  const userLoginAction = async () => {
    const f = loginFormRef.current;
    if (f.userId.value === "") {
      alert("사용자아이디를 입력하세요");
      f.userId.focus();
      return;
    }
    if (f.password.value === "") {
      alert("비밀번호를 입력하세요");
      f.password.focus();
      return;
    }
    const responseJsonObject = await userApi.userLoginAction(user);
    console.log("UserLoginFormPage response:", responseJsonObject);
    switch (responseJsonObject.status) {
      case ResponseStatusCode.LOGIN_SUCCESS:
        setCookie("member", JSON.stringify(responseJsonObject.data), 1);
        setLoginStatus({
          isLogin: true,
          loginUser: responseJsonObject.data
        });
        navigate("/user_main");
        break;
      case ResponseStatusCode.LOGIN_FAIL_NOT_FOUND_USER:
        setMessage({
          id: ResponseMessage.LOGIN_FAIL_NOT_FOUND_USER
        });
        break;
      case ResponseStatusCode.LOGIN_FAIL_PASSWORD_MISMATCH_USER:
        setMessage({
          password: ResponseMessage.LOGIN_FAIL_PASSWORD_MISMATCH_USER
        });
        break;
    }
    */
return (
  <table border="0" cellPadding="0" cellSpacing="0">
    <tbody>
      <tr>
        <td>
          <br />
          <table
            style={{ paddingLeft: "10px" }}
            border="0"
            cellPadding="0"
            cellSpacing="0"
          >
            <tbody>
              <tr>
                <td bgcolor="f4f4f4" height="22">
                  &nbsp;&nbsp;<b>사용자 관리 - 로그인</b>
                </td>
              </tr>
            </tbody>
          </table>
          <form ref={loginFormRef} name="f" method="post" >
            <table
              border="0"
              cellPadding="0"
              cellSpacing="1"
              bgcolor="BBBBBB"
            >
              <tbody>
                <tr>
                  <td width="100" align="center" bgcolor="E6ECDE" height="22">
                    사용자 아이디
                  </td>
                  <td
                    width="490"
                    align="left"
                    bgcolor="ffffff"
                    style={{ paddingLeft: "10px" }}
                  >
                    <input
                      type="text"
                      style={{ width: 150 }}
                      name="userId"
                      value={user.userId}
                      onChange={handleChangeLoginForm}

                    />
                    &nbsp;&nbsp;
                    <font color="red" id="idMessage">
                      {message.id}
                    </font>
                  </td>
                </tr>
                <tr>
                  <td width="100" align="center" bgcolor="E6ECDE" height="22">
                    비밀번호
                  </td>
                  <td
                    width="490"
                    align="left"
                    bgcolor="ffffff"
                    style={{ paddingLeft: "10px" }}
                  >
                    <input
                      type="password"
                      style={{ width: 150 }}
                      name="password"
                      value={user.password}
                      onChange={handleChangeLoginForm}
                    />
                    &nbsp;&nbsp;
                    <font color="red" id="passwordMessage">
                      {message.password}
                    </font>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>{" "}
          <br />
          <table border="0" cellPadding="0" cellSpacing="1">
            <tbody>
              <tr>
                <td align="center">
                  <input
                    type="button"
                    value="로그인"
                    onClick={userLoginAction}
                  />
                  &nbsp;
                  <Link to={"/user_write_form"}>
                    <input
                      type="button"
                      value="회원가입폼"
                    />
                  </Link>
                </td>

              </tr>

              <tr >
                <td align="center" style={{ paddingTop: '5px' }}>
                  <KakaoLoginComponent />
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table >
);
};
