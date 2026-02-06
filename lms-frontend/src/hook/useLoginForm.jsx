import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as userApi from "../api/userApi";
import * as ResponseStatusCode from "../api/ResponseStatusCode";
import * as ResponseMessage from "../api/ResponseMessage";
import {setCookie} from "../util/cookieUtil.js";
import {UserContext} from "../App"
const useLoginForm = () => {
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
    }
    return {loginFormRef,user,handleChangeLoginForm,message,userLoginAction};
}
export default useLoginForm;
