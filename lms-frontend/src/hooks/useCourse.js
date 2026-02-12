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
  }, [userId]);   // 🔥 반드시 userId 넣어야 함

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


