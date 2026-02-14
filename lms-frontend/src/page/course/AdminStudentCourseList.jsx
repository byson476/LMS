import React from "react";
import { useParams } from "react-router-dom";   // ✅ 추가
import "../../assets/css/course_tutor.css";
import { useAdminStudentCourseList } from "../../hooks/useCourse";

const AdminStudentCourseList = () => {

  const { studentId } = useParams();  // ✅ URL 파라미터 받기
  console.log("studentId:", studentId);

  const {
    courses,
    selectedIds,
    handleCheck,
    deleteCourses,
  } = useAdminStudentCourseList(studentId);  // 👉 필요하면 훅에 넘겨주기

  return (
    <div className="course-page">
      <div className="page-header">
        <h1>강의 목록</h1>
        <p>강의 정보를 확인하고 관리할 수 있습니다.</p>
      </div>

      <div className="course-list">
        <table>
          <thead>
            <tr className="table-action-row">
              <th colSpan="5">
                <button
                  className="btn-delete"
                  onClick={deleteCourses}
                  disabled={selectedIds.length === 0}
                >
                  선택 삭제
                </button>
              </th>
            </tr>

            <tr>
              <th className="col-check">선택</th>
              <th className="col-title">강의명</th>
              <th>강의설명</th>
              <th>강사명</th>
              <th>수강시작일</th>
            </tr>
          </thead>

          <tbody>
            {courses.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: "40px 0", textAlign: "center" }}>
                  강의가 없습니다.
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
                        handleCheck(course.courseId)
                      }
                    />
                  </td>

                  <td className="col-title">{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.instructorName}</td>
                  <td>{course.startDate}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default AdminStudentCourseList;
