import { useEffect, useRef, useState } from "react";
import * as userApi from '../api/userApi';
import * as responseStatusCode from '../api/ResponseStatusCode';
import * as responseMessage from '../api/ResponseMessage';
import { useNavigate } from "react-router-dom";
export const UserWriteFormPage = () => {
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
  const [idMessage, setIdMessage] = useState('');

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
        navigate(`/user_login_form`)
        break;
      case responseStatusCode.CREATE_FAIL_EXISTED_USER:
        setIdMessage(responseMessage.CREATE_FAIL_EXISTED_USER);
        break;
    }

  }

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
                    &nbsp;&nbsp;<b>사용자 관리 - 회원 가입</b>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <!-- write Form  --> */}
            <form ref={writeFormRef} name="f" method="post" >

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
                      <input
                        type="text"
                        style={{ width: "150px" }}
                        name="userId"
                        onChange={handleChangeUserWriteForm}
                        value={user.userId}
                      />
                      &nbsp;&nbsp;<font color="red">{idMessage}</font>
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
                        onChange={handleChangeUserWriteForm}
                        value={user.password}
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
                        onChange={handleChangeUserWriteForm}
                        value={user.password2}
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
                        onChange={handleChangeUserWriteForm}
                        value={user.name}
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
                        onChange={handleChangeUserWriteForm}
                        value={user.email}
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
                      onClick={userWriteAction}
                      type="button"

                      value="회원 가입"
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
