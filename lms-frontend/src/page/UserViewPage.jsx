import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as userApi from "../api/userApi";
import * as ResponseStatusCode from "../api/ResponseStatusCode";
import { UserContext } from "../App";
import { removeCookie, getCookie, setCookie } from "../util/cookieUtil";

export const UserViewPage = () => {
  const { loginStatus, setLoginStatus } = useContext(UserContext);

  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState({
    userId: "",
    password: "",
    name: "",
    email: ""
  })

  useEffect(() => {
    (async () => {
      let responseJsonObject = await userApi.userView(userId);
      switch (responseJsonObject.status) {
        case ResponseStatusCode.READ_USER:
          setUser(responseJsonObject.data);
          break;
        case ResponseStatusCode.ERROR_ACCESSDENIED:
          alert(responseJsonObject.message);
          navigate(`/user_view/${loginStatus.loginUser.userId}`);
          break;
        case ResponseStatusCode.ERROR_ACCESS_TOKEN:
        case ResponseStatusCode.ERROR_NOT_FOUND_ACCESS_TOKEN:
          alert(responseJsonObject.message);
          console.log(responseJsonObject);
          setLoginStatus({
            isLogin: false,
            loginUser: {}
          });
          removeCookie("member");
          window.location.href = "/";
          break;
        case ResponseStatusCode.ERROR_EXPIRED_TOKEN:  
          alert(responseJsonObject.message+" 토큰재발행 쿠키갱신");
          console.log(responseJsonObject);

          userApi.userRefreshToken().then((responseJsonObject) => {
            console.log(responseJsonObject);
            const memberCookie = JSON.parse(getCookie("member"));
            console.log("old accessToken : "+memberCookie.accessToken);
            console.log("old refreshToken: "+memberCookie.refreshToken);
            console.log("new accessToken : "+responseJsonObject.accessToken);
            console.log("new refreshToken: "+responseJsonObject.refreshToken);
           
            memberCookie.accessToken = responseJsonObject.accessToken;
            memberCookie.refreshToken = responseJsonObject.refreshToken;
            setCookie("member", JSON.stringify(memberCookie), 1)
            window.location.href = "/";
           
          });
           break;
      }

    })();
  }, [userId]);



  const userDeleteAction = () => {
    userApi.userDeleteAction(userId).then(function (responseJsonObject) {
      switch (responseJsonObject.status) {
        case ResponseStatusCode.DELETE_USER:
          setLoginStatus({
            isLogin: false,
            loginUser: {}
          });
          removeCookie("member");
          navigate('/user_main');
          break;
        case ResponseStatusCode.ERROR_ACCESSDENIED:
          alert(responseJsonObject.message);
          navigate(`/user_view/${loginStatus.loginUser.userId}`);
          break;

        case ResponseStatusCode.ERROR_ACCESS_TOKEN:
        case ResponseStatusCode.ERROR_NOT_FOUND_ACCESS_TOKEN:
          alert(responseJsonObject.message);
          setLoginStatus({
            isLogin: false,
            loginUser: {}
          });
          removeCookie("member");
          window.location.href = "/";
          break;
      }
    });
  }

  return (
    <table border="0" cellPadding="0" cellSpacing="0">
      <tbody>
        <tr>
          <td>
            {/* <!--contents--> */}
            <br />
            <table
              style={{ paddingLeft: '10px' }}
              border="0"
              cellPadding="0"
              cellSpacing="0"
            >
              <tbody>
                <tr>
                  <td bgcolor="f4f4f4" height="22">
                    &nbsp;&nbsp;<b>사용자 관리 - 사용자 정보보기</b>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <!-- view Form  --> */}
            <form name="f" method="post">
              <input type="hidden" name="userId" value={user.userId} />
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
                    <td width="490" bgcolor="ffffff" style={{ paddingLeft: '10px' }}>
                      {user.userId}
                    </td>
                  </tr>
                  <tr>
                    <td width="100" align="center" bgcolor="E6ECDE" height="22">
                      이름
                    </td>
                    <td width="490" bgcolor="ffffff" style={{ paddingLeft: '10px' }}>
                      {user.name}
                    </td>
                  </tr>
                  <tr>
                    <td width="100" align="center" bgcolor="E6ECDE" height="22">
                      이메일 주소
                    </td>
                    <td width="490" bgcolor="ffffff" style={{ paddinLeft: '10px' }}>
                      {user.email}
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
                    <Link to={`/user_modify_form/${user.userId}`}>
                      <input
                        type="button"
                        value="수정폼"
                      />
                    </Link>
                    &nbsp;
                    <input
                      type="button"
                      value="탈퇴"
                      onClick={userDeleteAction}
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
