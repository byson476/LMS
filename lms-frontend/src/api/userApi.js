import { getCookie, removeCookie } from "../util/cookieUtil";
import * as ResponseStatusCode from "../api/ResponseStatusCode";
import * as ResponseMessage from "../api/ResponseMessage";
import {authHeaders} from "./authHeader";

export const BACKEND_SERVER = "http://localhost:8080";

//관리자 - 학생 목록
export const useAdminStudentlist=async(userId)=>{
  const response= await fetch(`${BACKEND_SERVER}/student/admin_studentlist/${userId}`,
    {
        method:"GET",
        headers: authHeaders(),   
    });
  return await response.json();
}
//관리자 - 수강생 삭제
export const useAdminDeleteStudent = async (userId, studentId) => {
  console.log("조경진----");
  const response = await fetch(
    `${BACKEND_SERVER}/student/admin_deletestudent/${userId}?studentId=${studentId}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(`삭제 실패: ${response.status}`);
  }

  return await response.json();
};


//관리자 - 강사 목록
export const useAdminTutorlist=async(userId)=>{
  const response= await fetch(`${BACKEND_SERVER}/tutor/admin_tutorlist/${userId}`,
    {
        method:"GET",
        headers: authHeaders(),   
    });
  return await response.json();
}

//관리자 - 학생/강사/관리자 등록
export const useAlluserRegist = async (sendJsonObject) => {
  const response = await fetch(`${BACKEND_SERVER}/user/admin_user_regist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(), // authHeaders()가 { Authorization: ... }를 반환
    },
    body: JSON.stringify(sendJsonObject),
  });
  const responseJsonObject = await response.json();
  console.log(">>> userApi.userWriteAction()-->response:", responseJsonObject);
  return responseJsonObject;
};


export const userWriteAction = async (sendJsonObject) => {
  const response = await fetch(`${BACKEND_SERVER}/user`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(sendJsonObject),
  });
  const responseJsonObject = await response.json();
  console.log(">>> userApi.userWriteAction()-->response:", responseJsonObject);
  return responseJsonObject;
};
export const userLoginAction = async (sendJsonObject) => {
  const params = new URLSearchParams(sendJsonObject).toString();
  const response = await fetch(`${BACKEND_SERVER}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params,
  });
  const responseJsonObject = await response.json();
  console.log(">>> userApi.userLoginAction()-->response:", responseJsonObject);
  return responseJsonObject;
};

export const userDeleteAction = async (userId) => {
  /******login check[cookie check]******/
  const member = JSON.parse(getCookie("member"));
  if (!member) {
    console.log("Member NOT FOUND");
    alert("로그인 해야만 합니다.");
    window.location.hash = "#user_login_form";
    return;
  }
  /**********************************/
  const { accessToken } = member;
  const response = await fetch(`${BACKEND_SERVER}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  });
  const responseJsonObject = await response.json();

  return responseJsonObject;
};

export const userView = async (userId) => {
  /******login check[cookie check]******/
  const member = JSON.parse(getCookie("member"));
  if (!member) {
    console.log("Member NOT FOUND");
    return {
      data: {},
      status: ResponseStatusCode.ERROR_NOT_FOUND_ACCESS_TOKEN,
      message: ResponseMessage.ERROR_NOT_FOUND_ACCESS_TOKEN,
    };
  }
  /**********************************/

  const { accessToken } = member;
  const response = await fetch(`${BACKEND_SERVER}/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  });
  const responseJsonObject = await response.json();
  console.log(">>> userApi.userView()-->response:", responseJsonObject);
  return responseJsonObject;
};
export const userViewEmail = async (email) => {
  /******login check[cookie check]******/
  const member = JSON.parse(getCookie("member"));
  if (!member) {
    console.log("Member NOT FOUND");
    return {
      data: {},
      status: ResponseStatusCode.ERROR_NOT_FOUND_ACCESS_TOKEN,
      message: ResponseMessage.ERROR_NOT_FOUND_ACCESS_TOKEN,
    };
  }
  /**********************************/
  const { accessToken } = member;
  const response = await fetch(`${BACKEND_SERVER}/user/social/${email}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-type": "application/json",
    },
  });
  const responseJsonObject = await response.json();
  console.log(">>> userApi.userViewEmail()-->response:", responseJsonObject);
  return responseJsonObject;
};
export const userModifyAction = async (sendJsonObject) => {
  /******login check[cookie check]******/
  const member = JSON.parse(getCookie("member"));
  if (!member) {
    console.log("Member NOT FOUND");
    return {
      data: {},
      status: ResponseStatusCode.ERROR_NOT_FOUND_ACCESS_TOKEN,
      message: ResponseMessage.ERROR_NOT_FOUND_ACCESS_TOKEN,
    };
  }
  /**********************************/
  const { accessToken } = member;
  const response = await fetch(
    `${BACKEND_SERVER}/user/${sendJsonObject.userId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendJsonObject),
    }
  );
  const responseJsonObject = await response.json();
  console.log(">>> userApi.userModifyAction()-->response:", responseJsonObject);

  return responseJsonObject;
};
export const userModifyActionSocial = async (sendJsonObject) => {
  /******login check[cookie check]******/
  const member = JSON.parse(getCookie("member"));
  if (!member) {
    console.log("Member NOT FOUND");
    return {
      data: {},
      status: ResponseStatusCode.ERROR_NOT_FOUND_ACCESS_TOKEN,
      message: ResponseMessage.ERROR_NOT_FOUND_ACCESS_TOKEN,
    };
  }
  /**********************************/
  const { accessToken } = member;
  const response = await fetch(
    `${BACKEND_SERVER}/api/member/modify/${sendJsonObject.email}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(sendJsonObject),
    }
  );
  const responseJsonObject = await response.json();
  console.log(">>> userApi.userModifyAction()-->response:", responseJsonObject);

  return responseJsonObject;
};
export const userLogoutAction = async () => {
  /******login check[cookie check]******/
  const member = JSON.parse(getCookie("member"));
  if (!member) {
    console.log("Member NOT FOUND");
    return {
      data: {},
      status: ResponseStatusCode.ERROR_NOT_FOUND_ACCESS_TOKEN,
      message: ResponseMessage.ERROR_NOT_FOUND_ACCESS_TOKEN,
    };
  }
  /**********************************/
  const { accessToken } = member;
  const response = await fetch(`${BACKEND_SERVER}/user/logout`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const responseJsonObject = await response.json();
  console.log(">>> userApi.userLogoutAction()-->response:", responseJsonObject);
  return responseJsonObject;
};

export const userRefreshToken = async () => {
  const member = JSON.parse(getCookie("member"));
  if (!member) {
    console.log("Member NOT FOUND");
    return {
      data: {},
      status: ResponseStatusCode.ERROR_NOT_FOUND_ACCESS_TOKEN,
      message: ResponseMessage.ERROR_NOT_FOUND_ACCESS_TOKEN,
    };
  }
  /**********************************/
  const { accessToken, refreshToken } = member;

  const response = await fetch(
    `${BACKEND_SERVER}/api/member/refresh?refreshToken=${refreshToken}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const responseJsonObject = await response.json();
  console.log(">>> userApi.userRefreshToken()-->response:", responseJsonObject);
  return responseJsonObject;
};
