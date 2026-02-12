import { useState, useEffect, useContext } from 'react';
import { useTutorCourselist } from '../../hooks/useCourse';
import { Link } from 'react-router-dom';
import { UserContext } from "../../App";
import "../../assets/css/course_tutor.css";

export const TutorCourseList = () => {
  const { loginStatus } = useContext(UserContext);
  const { courseListItems } = useTutorCourselist([]);

  // pagination 관련
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // 반드시 배열로 시작
  const [courses, setCourses] = useState([]);

  // 서버 데이터 받아와서 상태 세팅
  useEffect(() => {
    if (courseListItems && courseListItems.length > 0) {
      console.log("CourseListTutor - courseListItems:", courseListItems);
      const mappedCourses = courseListItems.map(course => ({
        courseId: course.courseId,
        title: course.title,
        description: course.description,
        tutorName: course.tutorName,
        enrolledDate: course.enrolledDate,
        totalStudents: course.totalStudents,
        total: Math.floor(Math.random() * 31) + 10,
      }));

      setCourses(mappedCourses);
      setCurrentPage(1);
    }
  }, [courseListItems]);

  // pagination 계산
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCourses = courses.slice(startIndex, startIndex + itemsPerPage);

  if (!courses || courses.length === 0) {
    return <div>강의 목록을 불러오는 중...</div>;
  }

  return (
    <div className="course-page">
      <header className="page-header">
        <h1>강사용 강의 목록</h1>
        <p>강의명을 클릭하면 상세 화면으로 이동합니다.</p>
      </header>

      {/* 목록형 강의 리스트 */}
      <section className="course-list">
        <table>
          <thead>
            <tr>
              <th>강의명</th>
              <th>강의 설명</th>
              <th>총강</th>
              <th>수강 학생 수</th>
            </tr>
          </thead>
          <tbody>
            {currentCourses.map(course => (
              <tr key={course.courseId}>
                <td>
                  <Link
                    to={`/tutor_student_list/${course.courseId}`}
                    className="course-title"
                  >
                    {course.title}
                  </Link>
                </td>
                <td className="course-description">
                  {course.description}
                </td>
                <td>{course.total}강</td>
                <td>{course.totalStudents}명</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 페이징 */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default TutorCourseList;
