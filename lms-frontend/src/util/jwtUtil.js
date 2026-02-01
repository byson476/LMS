import axios from "axios";
import { BACKEND_SERVER } from "../api/userApi";
export const refreshJWT = async (accessToken, refreshToken) => {
  const host = BACKEND_SERVER;
  const header = { headers: { Authorization: `Bearer ${accessToken}` } };
  const res = await axios.get(
    `${host}/api/member/refresh?refreshToken=${refreshToken}`,
    header
  );
  console.log("----------------------");
  console.log(res.data);
  return res.data;
};
