import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdminStudentlist } from "../../hooks/useUser";
import "../../assets/css/course_tutor.css";

function AdminStudentlist() {
  const navigate = useNavigate();

  const {
    students,
    loading,
    error,

    selectedIds,
    handleCheck,
    handleAllCheck,
    isAllChecked,
    allCheckRef,

    deleteStudents,
  } = useAdminStudentlist();

  const goToStudentCourses = (studentId) => {
    navigate(`/student_courseslist/${studentId}`);
  };

  if (loading) return <div>로딩 중...</div>
  if (error) return <div>에러 발생</div>;

  return (
    <div className="course-students-page">
      <div className="page-header">
        <h1>수강생 목록</h1>
      </div>

      <div className="student-list">
        <table>
          <thead>

            {/* 🔥 버튼 행 */}
            <tr className="table-action-row">
              <th colSpan="4">
                <button
                  className="btn-delete"
                  disabled={selectedIds.length === 0}
                  onClick={deleteStudents}
                >
                  선택 삭제
                </button>
              </th>
            </tr>

            {/* 🔥 헤더 */}
            <tr>
              <th>
                <label className="custom-check">
                  <input
                    ref={allCheckRef}
                    type="checkbox"
                    checked={isAllChecked}
                    onChange={handleAllCheck}
                  />
                  <span className="checkmark"></span>
                </label>
              </th>
              <th>학생아이디</th>
              <th>이름</th>
              <th>이메일</th>
            </tr>

          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4">등록된 학생이 없습니다.</td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.studentId}>
                  <td>
                    <label className="custom-check">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(student.studentId)}
                        onChange={() =>
                          handleCheck(student.studentId)
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>

                  <td
                    className="link-text"
                    onClick={() =>
                      goToStudentCourses(student.studentId)
                    }
                    style={{
                      cursor: "pointer",
                      color: "#5f63e6",
                      fontWeight: "600",
                    }}
                  >
                    {student.studentId}
                  </td>

                  <td>{student.name}</td>
                  <td>{student.email}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminStudentlist;
