import { useNavigate } from "react-router-dom"
import { UserContext } from "../App"
import { useContext } from "react";
import * as userApi from "../api/userApi";
import { removeCookie } from "../util/cookieUtil";

const useCustomLogout = () => {
    const { loginStatus, setLoginStatus } = useContext(UserContext);
    const navigate = useNavigate();
    const userLogoutAction = async () => {
        const responseJsonObject = await userApi.userLogoutAction();

        setLoginStatus({
            isLogin: false,
            loginUser: {}
        });
        removeCookie("member");
        navigate('/user_main',{replace:true});

    };

    return { userLogoutAction, loginStatus, setLoginStatus };
}
export default useCustomLogout;