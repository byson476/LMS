import { useEffect, useState, useCallback, useContext } from 'react';
import { useUserContext } from '../context/UserContext';
import { UserContext } from "../App";
import * as courseApi from '../api/courseApi';

//학생 - 수강 강의 목록
export const useStudentCourselist = (initialCourselist = []) => {
  const { loginStatus } = useContext(UserContext);
  const loginUser = loginStatus?.loginUser;
  const userId = loginUser?.userId;
  const userRole = loginUser?.roleNames?.[0]; // Assuming the first role is the primary role
  const [courseListItems, setCourseListItems] = useState(initialCourselist);

  const fetchCourseList = useCallback(async () => {
    if (!userId) {
      setCourseListItems([]);
      return;
    }
    try {
      const responseJsonObject = await courseApi.useStudentCourselist(userId);
      if (responseJsonObject?.status === 1) {
        const data = responseJsonObject.data ?? [];
        const normalized = data.map((item) => ({
          courseId: item.courseId,
          title: item.title,
          description: item.description,
          tutorName: item.tutorName,  
          courseId: item.courseId,
          enrolledDate: item.enrolledDate,
          enrollmentId: item.enrollmentId,
          totalStudents: item.totalStudents
        }));
        setCourseListItems(normalized);
      } else {
        setCourseListItems([]);
      }
    } catch (e) {
      setCourseListItems([]);
    }
  }, [userId]);

  useEffect(() => {
    fetchCourseList();
  }, [fetchCourseList]);


  return { courseListItems};
};

//강사 - 개설 강의 목록
export const useTutorCourselist = (initialCourselist = []) => {
  const { loginStatus } = useContext(UserContext);
  const loginUser = loginStatus?.loginUser;
  const userId = loginUser?.userId;
  const userRole = loginUser?.roleNames?.[0]; // Assuming the first role is the primary role
  const [courseListItems, setCourseListItems] = useState(initialCourselist);
  const fetchCourseList = useCallback(async () => {
    if (!userId) {
      setCourseListItems([]);
      return;
    }
    try {
      const responseJsonObject = await courseApi.useTutorCourselist(userId);
      if (responseJsonObject?.status === 1) {
        const data = responseJsonObject.data ?? [];
        const normalized = data.map((item) => ({
          courseId: item.courseId,
          title: item.title,
          description: item.description,
          tutorName: item.tutorName,  
          courseId: item.courseId,
          enrolledDate: item.enrolledDate,
          enrollmentId: item.enrollmentId,
          totalStudents: item.totalStudents
        }));
        setCourseListItems(normalized);
      } else {
        setCourseListItems([]);
      }
    } catch (e) {
      setCourseListItems([]);
    }
  }, [userId]);

  useEffect(() => {
    fetchCourseList();
  }, [fetchCourseList]);


  return { courseListItems};
};

// 강사 - 강의별 수강 학생 목록
export const useTutorStudentlist = (courseId, initialStudentlist = []) => {
  const { loginStatus } = useContext(UserContext);
  const loginUser = loginStatus?.loginUser;
  const userId = loginUser?.userId;

  const [studentListItems, setStudentListItems] =
    useState(initialStudentlist);

  const fetchTutorStudentList = useCallback(async () => {
    if (!userId || !courseId) {
      setStudentListItems([]);
      return;
    }

    try {
      const responseJsonObject =
        await courseApi.useTutorStudentlist(userId, courseId);

      if (responseJsonObject?.status === 1) {
        const data = responseJsonObject.data ?? [];

        const normalized = data.map(item => ({
          studentId: item.studentId,
          name: item.name,
          email: item.email,
          enrolledDate: item.enrolledDate,
        }));

        setStudentListItems(normalized);
      } else {
        setStudentListItems([]);
      }
    } catch (error) {
      console.error("수강생 목록 조회 실패", error);
      setStudentListItems([]);
    }
  }, [userId, courseId]);

  useEffect(() => {
    fetchTutorStudentList();
  }, [fetchTutorStudentList]);

  return { studentListItems };
};


//관리자 - 강의 목록
// 관리자 - 강의 목록
export const useAdminCourseList = (initialValue = []) => {
  const { loginStatus } = useContext(UserContext);
  const loginUser = loginStatus?.loginUser;
  const userId = loginUser?.userId;

  const [courseListItems, setCourseListItems] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAdminCourseList = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(false);

      const response = await courseApi.useAdminCourseList(userId);

      if (response?.status === 1) {
        const data = response.data ?? [];

        const mapped = data.map(course => ({
          courseId: course.courseId,
          tutorName: course.tutorName,
          title: course.title,
          description: course.description,
          studentCount: course.studentCount,
        }));

        setCourseListItems(mapped);
      } else {
        setCourseListItems([]);
      }

    } catch (e) {
      console.error("관리자 강의 목록 조회 실패", e);
      setError(true);
      setCourseListItems([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);   // 

  useEffect(() => {
    if (userId) {
      fetchAdminCourseList();
    }
  }, [userId, fetchAdminCourseList]);

  return { courseListItems, loading, error, fetchAdminCourseList };
};


//관리자 - 강의 삭제
export const useAdminDeleteCourse = () => {
  const { loginStatus } = useContext(UserContext);
  const loginUser = loginStatus?.loginUser;
  const userId = loginUser?.userId;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteCourses = async (courseIds) => {
    if (!courseIds || courseIds.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      await Promise.all(
        courseIds.map((courseId) =>
          courseApi.useAdminDeleteCourse(userId, courseId)
        )
      );
    } catch (e) {
      setError(e);
      throw e;   
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteCourses,
    loading,
    error
  };
};

//관리자 - 강의 등록
export const useAdminRegistCourse = (initialValue) => {
  const { loginStatus } = useContext(UserContext);
  const loginUser = loginStatus?.loginUser;

  const [form, setForm] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // form 값 변경
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // form 초기화
  const resetForm = () => {
    setForm(initialValue);
  };

  // 강의 등록 API 호출
  const registCourse = async () => {
    if (!loginUser?.userId) {
      throw new Error("로그인 정보가 없습니다.");
    }

    setLoading(true);
    setError(null);

    try {
      const sendJsonObject = {
        title: form.title,
        tutorId : form.tutorId,
        description: form.description,
        userId: String(loginUser.userId), // 반드시 문자열
        startDate : form.startDate,
        totalStudents: Number(form.totalStudents), // DTO가 int라면 숫자로
      };

      const response = await courseApi.useAdminRegistCourse(sendJsonObject);
      // resetForm(); // 등록 후 초기화 원하면 주석 해제
      return response;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleChange,
    resetForm,
    registCourse,
    loading,
    error,
  };
};

// 관리자 - 강사 선택
export const useTutorSeletor = (initialValue = []) => {
  const { loginStatus } = useContext(UserContext);
  const loginUser = loginStatus?.loginUser;
  const userId = loginUser?.userId;

  const [tutors, setTutors] = useState(initialValue); // state 이름 tutors로 통일
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTutorList = useCallback(async () => {
    if (!userId) return; // 로그인 안되어 있으면 fetch 안함

    try {
      setLoading(true);
      setError(false);

      const response = await courseApi.useTutorSeletor(userId); // API 호출
      console.log("Tutor 목록 API 결과:", response);

      if (response?.status === 2210) { // 성공 코드에 맞게 수정
        const data = response.data ?? [];
        const mapped = data.map(tutor => ({
          id: tutor.tutorId,
          name: tutor.name,
        }));
        setTutors(mapped);
      } else {
        setTutors([]);
      }
    } catch (e) {
      console.error("강사 목록 조회 실패", e);
      setError(true);
      setTutors([]);
    } finally {
      setLoading(false);
    }
  }, [userId]); // userId가 바뀌면 재실행

  useEffect(() => {
    fetchTutorList();
  }, [fetchTutorList]);

  return { tutors, loading, error, fetchTutorList }; // 반환 이름 tutors로 통일
};




export const useCourselist = (initialCourselist = []) => {
  const { loginStatus } = useContext(UserContext);
  const loginUser = loginStatus?.loginUser;
  const userId = loginUser?.userId;
  const userRole = loginUser?.roleNames?.[0]; // Assuming the first role is the primary role
  const [courseListItems, setCourseListItems] = useState(initialCourselist);

  const fetchCourseList = useCallback(async () => {
    if (!userId) {
      setCourseListItems([]);
      return;
    }
    try {
      const responseJsonObject = await courseApi.useTutorStudentlist(userId, courseId);
      console.log("useCourse - responseJsonObject.status: ", responseJsonObject.status);
      if (responseJsonObject?.status === 1) {
        const data = responseJsonObject.data ?? [];
        const normalized = data.map((item) => ({
          courseId: item.courseId,
          title: item.title,
          description: item.description,
          tutorName: item.tutorName,  
          courseId: item.courseId,
          enrolledDate: item.enrolledDate,
          enrollmentId: item.enrollmentId,
          totalStudents: item.totalStudents
        }));
        setCourseListItems(normalized);
      } else {
        setCourseListItems([]);
      }
    } catch (e) {
      setCourseListItems([]);
    }
  }, [userId]);

  useEffect(() => {
    fetchCourseList();
  }, [fetchCourseList]);


  return { courseListItems};
};


