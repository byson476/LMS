import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../App"
import * as userApi from '../api/userApi';
import { removeCookie } from '../util/cookieUtil';
import useCustomLogout from '../hook/useCustomLogout';
function Navigation() {
    /*
    const { loginStatus, setLoginStatus } = useContext(UserContext);
    console.log(">>> Navigation.jsx update")
    console.log(">>> Navigation loginStatus:", loginStatus);

    const userLogoutAction = async () => {
        const responseJsonObject = await userApi.userLogoutAction();
        setLoginStatus({
            isLogin: false,
            loginUser: {}
        });
        removeCookie("member");
    };
    */
   const {userLogoutAction,loginStatus}=useCustomLogout();

    return (
        <div id="navigation">
            <ul>
                {!loginStatus.isLogin ? (
                    <>
                        {/* 로그인전 start*/}
                        <li>

                            <Link to={"/user_login"}>로그인</Link>
                        </li>
                        <li>
                            <Link to="/user_regist">회원가입</Link>
                        </li>
                        {/* 로그인전 end */}
                    </>
                ) : (
                    <>
                        {/*로그인후 start */}
                        <li className="nav-user">
                        {loginStatus.loginUser.name} 님 환영합니다.
                        </li>

                        <li>대시보드</li>
                        <li><Link to={`/course_list/${loginStatus.loginUser.userId}`}>강의 목록</Link></li>
                        <li>과제</li>
                        <li>시험</li>
                        <li>공지사항</li>
                        <li><Link to={`/user_view/${loginStatus.loginUser.userId}`}>마이페이지</Link></li>
                        <li>
                            <Link to={''} onClick={userLogoutAction}>로그아웃</Link>
                        </li>
                        {/*로그인후 end */}
                    </>
                )
                }
                <li>
                    <a href="http://localhost:8080/swagger-ui/index.html">swagger</a>
                </li>
            </ul>
        </div >
    )
}

export default Navigation