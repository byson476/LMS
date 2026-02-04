import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../api/kakaoApi";
import { LmsGlobalCommonContext } from '../App';
import { setCookie } from "../util/cookieUtil";
import * as ResponseStatusCode from "../api/ResponseStatusCode";
const KakaoRedirectPage = () => {
  const { setLoginStatus } = useContext(LmsGlobalCommonContext);
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const authCode = searchParams.get("code");
  console.log("1.authCode:", authCode);


  useEffect(() => {
    getAccessToken(authCode).then(accessToken => {
      console.log("2.accessToken:", accessToken);
      getMemberWithAccessToken(accessToken).then(responseJsonObject => {
        console.log("-------------------")
        console.log(responseJsonObject);
        if (responseJsonObject.status === ResponseStatusCode.LOGIN_SUCCESS) {
          setCookie("member", JSON.stringify(responseJsonObject.data), 1);
          setLoginStatus({
            isLogin: true,
            loginUser: responseJsonObject.data
          });
        }
        const loginUser = responseJsonObject.data
        if (loginUser && !loginUser.social) {
          //소셜 회원이 아니라면
          navigate({ pathname: "/" }, { replace: true })
        } else {
          //소셜 회원이라면
          navigate({ pathname: `/user_modify_form/${loginUser.userId}` }, { replace: true })
        }
      })
    })
  }, [authCode]);

  return (
    <div>
      <div>Kakao Login Redirect</div>
      <div>{authCode}</div>
    </div>
  )
}

export default KakaoRedirectPage;
