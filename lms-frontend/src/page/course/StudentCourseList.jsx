import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useStudentCourselist } from "../../hooks/useCourse";
import { UserContext } from "../../App";
import "../../assets/css/course_students.css";

export const StudentCourseList = () => {
  const { loginStatus } = useContext(UserContext);
  const { courseListItems } = useStudentCourselist([]);

  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  let { pathname } = useLocation();

  // 서버 데이터 받아와서 courses 상태에 세팅
  useEffect(() => {
    if (courseListItems) {
      const mappedCourses = courseListItems.map((course) => ({
        courseId: course.courseId,
        title: course.title,
        description: course.description,
        tutorName: course.tutorName || "홍길동",
        progress: Math.floor(Math.random() * 101),
        total: Math.floor(Math.random() * 31) + 10,
      }));

      setCourses(mappedCourses);
      setIsLoading(false);
    }
  }, [courseListItems]);

  // 🔥 로딩 중
  if (isLoading) {
    return <div style={{ padding: "40px" }}>강의 목록을 불러오는 중...</div>;
  }

  // 🔥 강의 없음
  if (courses.length === 0) {
    return (
      <div className="course-page">
        <header className="page-header">
          <h1>내 강의 목록</h1>
        </header>

        <div
          style={{
            padding: "60px",
            textAlign: "center",
            fontSize: "18px",
          }}
        >
          📚 수강 중인 강의가 없습니다.
        </div>
      </div>
    );
  }

  // 페이징 처리
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = courses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="course-page">
      <header className="page-header">
        <h1>내 강의 목록</h1>
      </header>

      {/* 강의 카드 */}
      <section className="course-list">
        {currentCourses.map((course) => (
          <article className="course-card" key={course.courseId}>
            <div className="course-thumbnail" />

            <div className="course-info">
              <h2>{course.title}</h2>
              <p className="description">{course.description}</p>

              <p className="instructor">
                강사: {course.tutorName}
              </p>

              <div className="progress-area">
                <div className="progress-bar">
                  <span
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
                <span className="progress-text">
                  {course.progress === 100
                    ? "수강 완료"
                    : `진도율 ${course.progress}%`}
                </span>
              </div>

              <div className="course-meta">
                <span>총 {course.total}강</span>
              </div>

              <button
                className={`continue-btn ${
                  course.progress === 100 ? "done" : ""
                }`}
              >
                {course.progress === 100
                  ? "복습하기"
                  : "이어보기"}
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* 페이징 */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentCourseList;
