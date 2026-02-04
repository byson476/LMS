import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as userApi from '../api/userApi';
import * as ResponseStatusCode from '../api/ResponseStatusCode';
import { LmsGlobalCommonContext } from "../App";
import { removeCookie } from "../util/cookieUtil";
export const UserModifyFormPage = () => {
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
    <table width="0" border="0" cellPadding="0" cellSpacing="0">
      <tbody>
        <tr>
          <td>
            {/* <!--contents--> */}
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
                    &nbsp;&nbsp;<b>사용자 관리 - 사용자수정</b>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <!-- modify Form  --> */}
            <form ref={modifyFormRef} name="f" method="post" >
              <table
                border="0"
                cellPadding="0"
                cellSpacing="1"
                width="590"
                bgcolor="BBBBBB"
              >
                <tbody>
                  <tr>
                    <td width="100" align="center" bgcolor="E6ECDE" height="22">
                      사용자 아이디
                    </td>
                    <td
                      width="490"
                      bgcolor="ffffff"
                      style={{ paddingLeft: "10px" }}
                      align="left"
                    >
                      {user.userId}
                    </td>
                  </tr>
                  <tr>
                    <td width="100" align="center" bgcolor="E6ECDE" height="22">
                      비밀번호
                    </td>
                    <td
                      width="490"
                      bgcolor="ffffff"
                      style={{ paddingLeft: "10px" }}
                      align="left"
                    >
                      <input
                        type="password"
                        style={{ width: "150px" }}
                        name="password"
                        value={user.password}
                        onChange={onChangeUserModifyForm}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td width="100" align="center" bgcolor="E6ECDE" height="22">
                      비밀번호 확인
                    </td>
                    <td
                      width="490"
                      bgcolor="ffffff"
                      style={{ paddingLeft: "10px" }}
                      align="left"
                    >
                      <input
                        type="password"
                        style={{ width: "150px" }}
                        name="password2"
                        value={user.password2}
                        onChange={onChangeUserModifyForm}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td width="100" align="center" bgcolor="E6ECDE" height="22">
                      이름
                    </td>
                    <td
                      width="490"
                      bgcolor="ffffff"
                      style={{ paddingLeft: "10px" }}
                      align="left"
                    >
                      <input
                        type="text"
                        style={{ width: "150px" }}
                        name="name"
                        value={user.name}
                        onChange={onChangeUserModifyForm}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td width="100" align="center" bgcolor="E6ECDE" height="22">
                      이메일 주소
                    </td>
                    <td
                      width="490"
                      bgcolor="ffffff"
                      style={{ paddingLeft: "10px" }}
                      align="left"
                    >
                   <input
                        type="text"
                        style={{ width: "150px" }}
                        name="email"
                        value={user.email}
                        onChange={onChangeUserModifyForm}
                        
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
            <br />

            <table border="0" cellPadding="0" cellSpacing="1">
              <tbody>
                <tr>
                  <td align="center">
                    <input
                      type="button"
                      value="수정"
                      onClick={userModifyAction}
                    />
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
