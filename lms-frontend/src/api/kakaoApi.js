
import { BACKEND_SERVER } from "./userApi";
const rest_api_key = `4c35ca8aa57dce8c012fbd79aaa84c16` //REST키값 
const redirect_uri = `http://localhost:5173/member/kakao`
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`
//엑세스 토큰 얻기 
const access_token_url = `https://kauth.kakao.com/oauth/token` //추가 
//보안 코드 활성화시 사용용
const client_secret = '1ZOQt0GxoOx.....KOL2ZNONGN2ef'

export const getKakaoLoginLink = () => {
  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  return kakaoURL
}
export const getAccessToken = async (authCode) => {
  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", rest_api_key);
  params.append("redirect_uri", redirect_uri);
  params.append("code", authCode);

  const response = await fetch(access_token_url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
};

export const getMemberWithAccessToken = async (accessToken) => {
  const url = `${BACKEND_SERVER}/api/member/kakao?accessToken=${encodeURIComponent(accessToken)}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const responseJsonObject = await response.json();
  return responseJsonObject;
};