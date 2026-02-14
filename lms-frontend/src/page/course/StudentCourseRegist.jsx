import React from "react";
import "../../assets/css/course_tutor.css";
import { useStudentCourseRegist } from "../../hooks/useCourse";

const StudentCourseRegist = () => {

  const {
    courses,
    loading,
    error,
    selectedIds,
    handleCheckboxChange,
    handleApplyCourses,
  } = useStudentCourseRegist();

  if (loading) {
    return <div className="course-page">로딩중...</div>;
  }

  if (error) {
    return <div className="course-page">강의 목록을 불러오지 못했습니다.</div>;
  }

  return (
    <div className="course-page">
      <div className="page-header">
        <h1>강의 목록</h1>
        <p>강의를 선택 후 신청할 수 있습니다.</p>
      </div>

      <div className="course-list">
        <table>
          <thead>
            {/* 🔥 강의신청 버튼 행 */}
            <tr className="table-action-row">
              <th colSpan="5">
                <button
                  className="btn-delete"
                  onClick={handleApplyCourses}
                  disabled={selectedIds.length === 0}
                >
                  강의신청
                </button>
              </th>
            </tr>

            <tr>
              <th className="col-check">선택</th>
              <th className="col-title">강의명</th>
              <th>강의설명</th>
              <th>강사명</th>
              <th>수강학생 수</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: "40px 0", textAlign: "center" }}>
                  등록된 강의가 없습니다.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.courseId}>
                  <td className="col-check">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(course.courseId)}
                      onChange={() =>
                        handleCheckboxChange(course.courseId)
                      }
                    />
                  </td>

                  <td className="col-title">
                    <span className="course-title">
                      {course.title}
                    </span>
                  </td>

                  <td>{course.description}</td>
                  <td>{course.tutorName}</td>
                  <td>{course.totalStudents}명</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentCourseRegist;
