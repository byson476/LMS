import { getCookie, removeCookie } from "./cookieUtil.js";

export const userLoginCheck = () => {
    const member = JSON.parse(getCookie("member"));
    const isLogin = member ? true : false;
    return {
        isLogin: isLogin,
        member: member
    }
}

