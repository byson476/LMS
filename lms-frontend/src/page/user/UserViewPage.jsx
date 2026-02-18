import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as userApi from "../../api/userApi";
import * as ResponseStatusCode from "../../api/ResponseStatusCode";
import { UserContext } from "../../App";
import { removeCookie, getCookie, setCookie } from "../../util/cookieUtil";

export const UserViewPage = () => {
  const { loginStatus, setLoginStatus } = useContext(UserContext);
  const navigate = useNavigate();
  const { userId } = useParams();

  const [user, setUser] = useState({
    userId: "",
    password: "",
    name: "",
    email: ""
  });

  useEffect(() => {
    (async () => {
      const responseJsonObject = await userApi.userView(userId);

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
          setLoginStatus({ isLogin: false, loginUser: {} });
          removeCookie("member");
          window.location.href = "/";
          break;

        case ResponseStatusCode.ERROR_EXPIRED_TOKEN:
          alert(responseJsonObject.message + " 토큰재발행");
          userApi.userRefreshToken().then((res) => {
            const memberCookie = JSON.parse(getCookie("member"));
            memberCookie.accessToken = res.accessToken;
            memberCookie.refreshToken = res.refreshToken;
            setCookie("member", JSON.stringify(memberCookie), 1);
            window.location.href = "/";
          });
          break;
      }
    })();
  }, [userId]);

  const userDeleteAction = () => {
    userApi.userDeleteAction(userId).then((responseJsonObject) => {
      switch (responseJsonObject.status) {
        case ResponseStatusCode.DELETE_USER:
          setLoginStatus({ isLogin: false, loginUser: {} });
          removeCookie("member");
          navigate("/user_main");
          break;
        default:
          alert(responseJsonObject.message);
      }
    });
  };

  return (
    <div className="user-view-page">
      <div className="user-view-box">
        <h2>사용자 정보</h2>

        <div className="user-info-row">
          <span className="label">아이디</span>
          <span className="value">{user.userId}</span>
        </div>

        <div className="user-info-row">
          <span className="label">이름</span>
          <span className="value">{user.name}</span>
        </div>

        <div className="user-info-row">
          <span className="label">이메일</span>
          <span className="value">{user.email}</span>
        </div>

        {/* 🔥 버튼 영역 */}
        <div
          className="user-view-actions"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "30px"
          }}
        >
          <Link to={`/user_edit/${user.userId}`}>
            <button
              style={{
                width: "110px",
                height: "40px",
                backgroundColor: "#5f63e6",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer"
              }}
            >
              수정
            </button>
          </Link>

          <button
            onClick={userDeleteAction}
            style={{
              width: "110px",
              height: "40px",
              backgroundColor: "#e74c3c",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            탈퇴
          </button>
        </div>
      </div>
    </div>
  );
};
