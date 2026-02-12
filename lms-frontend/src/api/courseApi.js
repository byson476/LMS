import {authHeaders} from "./authHeader";

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

  console.log("오긴해??? ", userId, "------", courseId);

  const response = await fetch(
    `${BACKEND_SERVER}/course/admin_deletecourse/${userId}?courseId=${courseId}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  console.log("@@@@ status:", response.status);
  console.log("@@@@ response:", response);

  if (!response.ok) {
    throw new Error(`삭제 실패: ${response.status}`);
  }

  return await response.json();
};



export const studentList=async(userId)=>{
	const response= await fetch(`${BACKEND_SERVER}/courses/student/${userId}`,
    {
        method:"GET",
        headers: authHeaders(),   
    });
	return await response.json();
}



//wishlist 저장
export const wishlisttWriteAction = async (sendJsonObject)=>{
    const response= await fetch(`${BACKEND_SERVER}/wishlist`,{
        method:'POST',
        headers: authHeaders({
            'Content-type':'application/json'
        }),
        body:JSON.stringify(sendJsonObject)
    });
    
    return await response.json();
}




export const wishlistDeleteWishlistId=async(wishlistId)=>{
	const response= await fetch(`${BACKEND_SERVER}/wishlist/${wishlistId}`,
    {
        method:"DELETE",
        headers: authHeaders(),
    });
    
	return await response.json();
}


export const wishlistDeleteUserId=async(userId)=>{
	const response= await fetch(`${BACKEND_SERVER}/wishlists/${userId}`,
    {
        method:"DELETE",
        headers: authHeaders(),
    });
    
	return await response.json();
}