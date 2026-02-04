// src/layout/Navigation.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCustomLogout from '../hooks/useCustomLogout';

function Navigation() {
  const { userLogoutAction, loginStatus } = useCustomLogout();

  // 안전하게 loginUser와 roleNames 초기화
  const loginUser = loginStatus?.loginUser || {};
  const roleNames = loginUser.roleNames || [];

  useEffect(() => {
    console.log('Navigation loginStatus:', loginStatus);
    console.log('Navigation roleNames:', roleNames);
  }, [loginStatus]);

  return (
    <div id="navigation">
      <ul>
        {!loginStatus?.isLogin ? (
          <>
            {/* 로그인 전 메뉴 */}
            <li>
              <Link to="/user_login">로그인</Link>
            </li>
            <li>
              <Link to="/user_regist">회원가입</Link>
            </li>
          </>
        ) : (
          <>
            {/* 로그인 후 메뉴 */}
            <li className="nav-user">
              [{roleNames.join(', ')}] {loginUser.name || ''} 님 환영합니다.
            </li>

            {roleNames.includes('STUDENT') && (
              <>
                <li>학생 메뉴</li>
                <li>
                  <Link to={`/course_list/${loginUser.userId}`}>강의 목록</Link>
                </li>
                <li>과제</li>
                <li>시험</li>
                <li>공지사항</li>
                <li>
                  <Link to={`/user_view/${loginUser.userId}`}>마이페이지</Link>
                </li>
                <li>
                  <Link to={''} onClick={userLogoutAction}>
                    로그아웃
                  </Link>
                </li>
              </>
            )}

            {roleNames.includes('TUTOR') && <li>강사 메뉴</li>}
            {roleNames.includes('ADMIN') && <li>관리자 메뉴</li>}
          </>
        )}

        <li>
          <a href="http://localhost:8080/swagger-ui/index.html">swagger</a>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
