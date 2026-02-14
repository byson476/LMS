import React from "react";
import { useNavigate } from "react-router-dom";
import { useAdminTutorlist } from "../../hooks/useUser";
import "../../assets/css/course_tutor.css";

function AdminTutorlist() {
  const navigate = useNavigate();

  const {
    tutors,
    loading,
    error,

    selectedIds,
    handleCheck,
    handleAllCheck,
    isAllChecked,
    allCheckRef,

    deleteTutors,
  } = useAdminTutorlist();

  const goToTutorCourses = (tutorId) => {
    navigate(`/tutors/${tutorId}/courses`);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <div className="course-students-page">
      <div className="page-header">
        <h1>강사 목록</h1>
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
                  onClick={deleteTutors}
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
              <th>강사아이디</th>
              <th>이름</th>
              <th>이메일</th>
            </tr>

          </thead>

          <tbody>
            {tutors.length === 0 ? (
              <tr>
                <td colSpan="4">등록된 강사가 없습니다.</td>
              </tr>
            ) : (
              tutors.map((tutor) => (
                <tr key={tutor.tutorId}>
                  <td>
                    <label className="custom-check">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(tutor.tutorId)}
                        onChange={() =>
                          handleCheck(tutor.tutorId)
                        }
                      />
                      <span className="checkmark"></span>
                    </label>
                  </td>

                  <td
                    className="link-text"
                    onClick={() =>
                      goToTutorCourses(tutor.tutorId)
                    }
                    style={{
                      cursor: "pointer",
                      color: "#5f63e6",
                      fontWeight: "600",
                    }}
                  >
                    {tutor.tutorId}
                  </td>

                  <td>{tutor.name}</td>
                  <td>{tutor.email}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default AdminTutorlist;
