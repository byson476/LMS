import { useContext, useState } from "react";
import { UserContext } from "../../App";

import "../../assets/css/register_course.css";

import { useAdminRegistCourse } from '../../hooks/useCourse';
import {useTutorSeletor} from '../../hooks/useCourse';
// 강사 선택 모달 컴포넌트
function TutorSelectModal({ visible, tutors, onSelect, onClose }) {
  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0,
      width: "100vw", height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        minWidth: "300px"
      }}>
        <h3>강사 선택</h3>
        <ul>
          {tutors.map(tutor => (
            <li key={tutor.id} style={{ cursor: "pointer", padding: "5px 0" }}
                onClick={() => { onSelect(tutor); onClose(); }}>
              {tutor.name} ({tutor.id})
            </li>
          ))}
        </ul>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

function AdminCourseRegist() {
  const { form, handleChange, resetForm, registCourse, loading, error } =
    useAdminRegistCourse({
      userId: "",
      title: "",
      description: "",
      maxStudents: "",
      startDate: "",
      tutorId: "",  // 강사 ID 초기값
    });

  const [modalVisible, setModalVisible] = useState(false);
  const { tutors, loading: tutorsLoading, error: tutorsError } = useTutorSeletor();

  const handleTutorSelect = (tutor) => {
    handleChange({ target: { name: "tutorId", value: tutor.id } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registCourse();
      alert("강의가 등록되었습니다.");
    } catch (e) {
      alert("등록 실패: " + e.message);
    }
  };
/*
  const handleTutorSelect = (tutor) => {
    handleChange({ target: { name: "tutorId", value: tutor.id } });
  };
*/
  return (
    <div className="course-container">
      <div className="course-box">
        <h2 className="course-title">강의 등록</h2>

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="userId" value={form.userId} />

          <div className="course-field">
            <label>강의 제목</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="course-field">
            <label>강의 설명</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          {/* 강사 선택 input */}
          <div className="course-field">
            <label>강사 ID</label>
            <input
              type="text"
              name="tutorId"
              value={form.tutorId}
              readOnly            // 사용자가 직접 입력 못하게
              placeholder="예: abc123"
              required
              onClick={() => setModalVisible(true)} // 클릭하면 모달 열기
            />
          </div>

          <div className="course-field">
            <label>최대 수강 인원</label>
            <input
              type="number"
              name="maxStudents"
              value={form.maxStudents}
              onChange={handleChange}
              required
            />
          </div>

          <div className="course-field">
            <label>시작일</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="course-button-group">
            <button type="button" className="cancel-btn" onClick={resetForm}>
              취소
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "등록 중..." : "등록하기"}
            </button>
          </div>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error.message}</p>}
        </form>
      </div>

      {/* 모달 */}
      <TutorSelectModal
        visible={modalVisible}
        tutors={tutors}
        onSelect={handleTutorSelect}
        onClose={() => setModalVisible(false)}
      />
    </div>
  );
}

export default AdminCourseRegist;
