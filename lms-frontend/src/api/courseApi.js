import {authHeaders} from "./authHeader";
import { getCookie } from "../util/cookieUtil";

const BACKEND_SERVER='http://localhost:8080';

//학생 - 수강 강의 목록
export const useStudentCourselist=async(userId)=>{
	const response= await fetch(`${BACKEND_SERVER}/coursee/student_courselist/${userId}`,
    {
        method:"GET",
        headers: authHeaders(),   
    });
	return await response.json();
}

//강사 - 개설 강의 목록
export const useTutorCourselist=async(userId)=>{
	const response= await fetch(`${BACKEND_SERVER}/course/tutor_courselist/${userId}`,
    {
        method:"GET",
        headers: authHeaders(),   
    });
	return await response.json();
}

// 강사 - 강의별 수강 학생 목록
export const useTutorStudentlist=async(userId, courseId)=>{
	const response= await fetch(`${BACKEND_SERVER}/coursee/tutor_students/${userId}?courseId=${courseId}`,
    {
        method:"GET",
        headers: authHeaders(),   
    });
	return await response.json();
}

//관리자 - 강의 목록
export const useAdminCourseList=async(userId)=>{
	const response= await fetch(`${BACKEND_SERVER}/course/admin_courselist/${userId}`,
    {
        method:"GET",
        headers: authHeaders(),   
    });
	return await response.json();
}


//관리자 - 강의 삭제
export const useAdminDeleteCourse = async (userId, courseId) => {
  const response = await fetch(
    `${BACKEND_SERVER}/course/admin_deletecourse/${userId}?courseId=${courseId}`,
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

//관리자 - 강의 등록
export const useAdminRegistCourse = async (sendJsonObject)=>{
  const response1 = await fetch(`${BACKEND_SERVER}/course/admin_registcourse`, {
    method: "POST",
headers: {
  "Content-Type": "application/json",
  ...authHeaders(), // authHeaders()가 { Authorization: ... }를 반환
},
        body: JSON.stringify(sendJsonObject),
  });
  const responseJsonObject = await response1.json();
  console.log(">>> userApi.userWriteAction()-->response:", responseJsonObject);
  return responseJsonObject;
}

//관리자 - 강의 등록 - 강사검색
export const useTutorSeletor=async(userId)=>{
	const response= await fetch(`${BACKEND_SERVER}/tutor/admin_tutorlist/${userId}`,
    {
        method:"GET",
        headers: authHeaders(),   
    });
	return await response.json();
}

//관리자 - 수강생 목록>>수강생의 수강 내역
export const getAdminStudentCourseList=async(userId, studentId)=>{
	const response= await fetch(`${BACKEND_SERVER}/coursee/admin_courselist/${userId}?studentId=${studentId}`,
    {
        method:"GET",
        headers: authHeaders(),   
    });
	return await response.json();
}

export const studentList=async(userId)=>{
	const response= await fetch(`${BACKEND_SERVER}/courses/student/${userId}`,
    {
        method:"GET",
        headers: authHeaders(),   
    });
	return await response.json();
}



