import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCourselist } from '../../hooks/useCourse';

export const CourseList = () => {
  const { courseListItems } = useCourselist([]);
  console.log("CourseList - courseListItems: ", courseListItems);

  // API에서 받아온 데이터 예시
  const rawCourses = courseListItems.length > 0 ? courseListItems : [
    { courseId: 1, title: 'Java Basics', description: 'Introduction to Java programming' },
    { courseId: 2, title: 'Advanced Java', description: 'Deep dive into Java programming' }
  ];

  // progress와 total 임의 값 추가
  const courses = rawCourses.map(course => ({
    ...course,
    instructor: '홍길동',                   // 강사 이름 기본값
    progress: Math.floor(Math.random() * 101), // 0~100 랜덤
    total: Math.floor(Math.random() * 31) + 10 // 10~40강 랜덤
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = courses.slice(startIndex, startIndex + itemsPerPage);

  let { pathname } = useLocation();

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

              <p className="instructor">강사: {course.instructor}</p>

              <div className="progress-area">
                <div className="progress-bar">
                  <span style={{ width: `${course.progress}%` }} />
                </div>
                <span className="progress-text">
                  {course.progress === 100 ? "수강 완료" : `진도율 ${course.progress}%`}
                </span>
              </div>

              <div className="course-meta">
                <span>총 {course.total}강</span>
              </div>

              <button className={`continue-btn ${course.progress === 100 ? "done" : ""}`}>
                {course.progress === 100 ? "복습하기" : "이어보기"}
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

export default CourseList;
