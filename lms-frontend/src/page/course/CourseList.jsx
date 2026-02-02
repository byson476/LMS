import { useContext, useRef, useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import * as userApi from "../../api/userApi";
import * as ResponseStatusCode from "../../api/ResponseStatusCode";
import * as ResponseMessage from "../../api/ResponseMessage";
import { UserContext } from '../../App';
import { setCookie } from "../../util/cookieUtil";
import KakaoLoginComponent from "../../component/KakaoLoginComponent";
import useLoginForm from "../../hook/useLoginForm";

export const CourseList = () => {
  // 더미 데이터 (나중에 API로 교체)
  const courses = [
    { id: 1, title: "React 입문", instructor: "홍길동", progress: 65, total: 20 },
    { id: 2, title: "Java 기초", instructor: "김철수", progress: 100, total: 30 },
    { id: 3, title: "Spring Boot", instructor: "이영희", progress: 40, total: 25 },
    { id: 4, title: "DB 설계", instructor: "박민수", progress: 80, total: 18 },
    { id: 5, title: "HTML/CSS", instructor: "최은지", progress: 55, total: 15 },
    { id: 6, title: "JavaScript", instructor: "정다은", progress: 20, total: 22 },
    { id: 7, title: "Node.js", instructor: "윤성호", progress: 10, total: 16 },
    { id: 8, title: "자료구조", instructor: "김현우", progress: 90, total: 20 }
  ];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = courses.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="course-page">

      <header className="page-header">
        <h1>내 강의 목록</h1>
      </header>

      {/* 강의 카드 */}
      <section className="course-list">
        {currentCourses.map(course => (
          <article className="course-card" key={course.id}>
            <div className="course-thumbnail" />

            <div className="course-info">
              <h2>{course.title}</h2>
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
