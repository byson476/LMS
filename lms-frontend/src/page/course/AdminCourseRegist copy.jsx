import { useContext } from "react";
import { UserContext } from "../../App";

import "../../assets/css/register_course.css";

import { useAdminRegistCourse } from '../../hooks/useCourse';

function AdminCourseRegist() {
  const { form, handleChange, resetForm, registCourse, loading, error } =
    useAdminRegistCourse({
      userId: "",
      title: "",
      description: "",
      maxStudents: "",
      startDate: "",
      tutorId: "",  // ← 강사 입력 추가
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registCourse();
      alert("강의가 등록되었습니다.");
    } catch (e) {
      alert("등록 실패: " + e.message);
    }
  };

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

          <div className="course-field">
            <label>강사 ID</label>
            <input
              type="text"
              name="tutorId"  // ← 강사
              value={form.tutorId}
              onChange={handleChange}
              placeholder="예: abc123"
              required
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
    </div>
  );
}

export default AdminCourseRegist;
