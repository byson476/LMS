import { useEffect, useState, useCallback, useContext, useRef  } from 'react';
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

//학생 - 수강 신청
export const useStudentCourseRegist = () => {

  const { loginStatus } = useContext(UserContext);
  const loginUser = loginStatus?.loginUser;
  const userId = loginUser?.userId;

  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]); // 🔥 이미 신청된 강의
  const [selectedIds, setSelectedIds] = useState([]); // 🔥 새로 선택한 강의
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const allCheckRef = useRef(null);

  // 🔥 강의 목록 조회
  useEffect(() => {
    if (userId) {
      fetchCourses();
    }
  }, [userId]);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      // 1️⃣ 전체 강의 목록
      const res = await courseApi.findStudentCourseList(userId);
  console.log("빠라바람 ",res);
      setCourses(Array.isArray(res.data) ? res.data : []);

      // 2️⃣ 이미 신청한 강의 목록
      const resChk = await courseApi.findStudentCourseEnrollmentList(userId);

      const enrolled = Array.isArray(resChk.data)
        ? resChk.data.map(item => item.courseId)
        : [];

      setEnrolledIds(enrolled);
      setSelectedIds([]); // 새 선택 초기화

    } catch (e) {
      console.error("강의 목록 조회 실패:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 개별 체크 (이미 신청된 강의는 제외)
  const handleCheckboxChange = (id) => {

    if (enrolledIds.includes(id)) return;

    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  // 🔥 전체 선택 (이미 신청된 강의 제외)
  const handleAllCheck = () => {

    const availableCourses = courses
      .map(c => c.courseId)
      .filter(id => !enrolledIds.includes(id));

    if (selectedIds.length === availableCourses.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(availableCourses);
    }
  };

  const isAllChecked =
    courses.length > 0 &&
    selectedIds.length ===
      courses.filter(c => !enrolledIds.includes(c.courseId)).length;

  // 🔥 강의 신청
  const handleApplyCourses = async () => {

    if (selectedIds.length === 0) return;

    try {
      await Promise.all(
        selectedIds.map((courseId) =>
          courseApi.useAStudentCourseRegist({
            userId: userId,
            courseId: courseId
          })
        )
      );

      alert("강의 신청이 완료되었습니다.");

      fetchCourses(); // 🔥 재조회 (신청 후 자동 반영)

    } catch (e) {
      console.error("강의 신청 실패:", e);
      alert("강의 신청 중 오류가 발생했습니다.");
    }
  };

  return {
    courses,
    loading,
    error,
    enrolledIds,
    selectedIds,
    handleCheckboxChange,
    handleAllCheck,
    isAllChecked,
    handleApplyCourses,
    allCheckRef,
  };
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


//강사 - 강의 등록
export const useTutorRegistCourse = (initialValue) => {
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
        description: form.description,
        userId: String(loginUser.userId), 
        tutorId: String(loginUser.userId), 
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

//관리자 - 수강생 목록>>수강생의 수강 내역
export const useAdminStudentCourseList = (studentId) => {
  const { loginStatus } = useContext(UserContext);
  const loginUser = loginStatus?.loginUser;
  const userId = loginUser?.userId;

  const [courses, setCourses] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const allCheckRef = useRef();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await courseApi.getAdminStudentCourseList(userId, studentId);
      setCourses(Array.isArray(res.data) ? res.data : []);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleAllCheck = () => {
    if (selectedIds.length === courses.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(courses.map((c) => c.courseId));
    }
  };

  const isAllChecked =
    courses.length > 0 &&
    selectedIds.length === courses.length;

  const deleteCourses = async () => {
    await Promise.all(
      selectedIds.map((courseId) =>
        courseApi.useAdminDeleteCourse(userId, courseId)
      )
    );

    fetchCourses();
    setSelectedIds([]);
  };

  return {
    courses,
    loading,
    error,
    selectedIds,
    handleCheck,
    handleAllCheck,
    isAllChecked,
    allCheckRef,
    deleteCourses,
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


