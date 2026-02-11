// src/page/course/TutorStudentList.jsx
import { useEffect, useContext } from "react";
import { useParams  } from "react-router-dom";
import { useTutorStudentlist } from "../../hooks/useCourse";
import { UserContext } from "../../App";
import "../../assets/css/course_tutor.css";

const TutorStudentList = () => {
  const { loginStatus } = useContext(UserContext);
  console.log(useParams());
  const { courseId } = useParams();   // 문자열
  const courseIdNumber = Number(courseId); // 숫자로 변환

  const {
    studentListItems,
    fetchTutorStudentList,
    loading,
    error,
  } = useTutorStudentlist(courseIdNumber);

  // 임시 courseId (나중에 params로 받아도 됨)
  //const courseId = 1;

  useEffect(() => {
    if (loginStatus?.userId) {
      fetchTutorStudentList(loginStatus.userId, courseIdNumber);
    }
  }, [loginStatus, courseIdNumber]);

  return (
    <div className="course-students-page">
      {/* 페이지 헤더 */}
      <header className="page-header">
        <h1>수강 학생 목록</h1>
        <p>총 {Array.isArray(studentListItems) ? studentListItems.length : 0}명</p>
      </header>

      {/* 상태 처리 */}
      {loading && <p>로딩 중...</p>}
      {error && <p style={{ color: "red" }}>에러가 발생했습니다.</p>}

      {/* 학생 목록 테이블 */}
      <section className="student-list">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>이름</th>
              <th>이메일</th>
              <th>수강일</th>
            </tr>
          </thead>
          <tbody>
            {!Array.isArray(studentListItems) ||
            studentListItems.length === 0 ? (
              <tr>
                <td colSpan="4">수강 중인 학생이 없습니다.</td>
              </tr>
            ) : (
              studentListItems.map((student, index) => (
                <tr key={student.studentId}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.enrolledDate}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TutorStudentList;
