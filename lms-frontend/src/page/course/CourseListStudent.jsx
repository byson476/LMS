import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { useCourselist } from '../../hooks/useCourse';
import { UserContext } from "../../App";
export const CourseListStudent = () => {
 const { loginStatus, setLoginStatus } = useContext(UserContext);
  const { courseListItems } = useCourselist([]);
  const [courses, setCourses] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  let { pathname } = useLocation();

  // 서버 데이터 받아와서 courses 상태에 세팅
  useEffect(() => {
    if (courseListItems && courseListItems.length > 0) {
      // 서버 데이터 기반으로 progress, total 등 추가
      const mappedCourses = courseListItems.map(course => ({
        courseId: course.courseId,
        title: course.title,
        description: course.description,
        tutorName: course.tutorName || '홍길동', // 서버 강사명 사용
        progress: Math.floor(Math.random() * 101), // 0~100 랜덤
        total: Math.floor(Math.random() * 31) + 10, // 10~40강 랜덤
      }));
      setCourses(mappedCourses);
    }
  }, [courseListItems]);

  // 페이징 처리
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = courses.slice(startIndex, startIndex + itemsPerPage);

  // **로딩 상태 처리**
  if (!courses || courses.length === 0) {
    return <div>강의 목록을 불러오는 중...</div>;
  }

  return (
    <div className="course-page">
      <header className="page-header">
        <h1>내 강의 목록</h1>
      </header>

      {/* 강의 카드 */}
      <section className="course-list">
        {currentCourses.map(course => (
          <article className="course-card" key={course.courseId}>
            <div className="course-thumbnail" />

            <div className="course-info">
              <h2>{course.title}</h2>
              <p className="description">{course.description}</p>

              <p className="instructor">강사: {course.tutorName}</p>

              <div className="progress-area">
                <div className="progress-bar">
                  <span style={{ width: `${course.progress}%` }} />
                </div>
                <span className="progress-text">
                  {course.progress === 100 ? '수강 완료' : `진도율 ${course.progress}%`}
                </span>
              </div>

              <div className="course-meta">
                <span>총 {course.total}강</span>
              </div>

              <button className={`continue-btn ${course.progress === 100 ? 'done' : ''}`}>
                {course.progress === 100 ? '복습하기' : '이어보기'}
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
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CourseListStudent;
