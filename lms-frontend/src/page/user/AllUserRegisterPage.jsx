import React from "react";
import "../../assets/css/register_course.css";
import { useAlluserRegist } from "../../hooks/useUser";

function AllUserRegisterPage() {
  const {
    formData,
    loading,
    error,
    handleChange,
    handleSubmit,
  } = useAlluserRegist();

  return (
    <div className="course-container">
      <div className="course-box">
        <h2 className="course-title">회원가입</h2>

        <form onSubmit={handleSubmit}>

          <div className="course-field">
            <label>아이디</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="course-field">
            <label>비밀번호</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="course-field">
            <label>이름</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="course-field">
            <label>이메일</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="course-field">
            <label>회원 유형</label>

            <div className="role-select-group">
              <label>
                <input
                  type="radio"
                  name="role"
                  value="STUDENT"
                  checked={formData.role === "STUDENT"}
                  onChange={handleChange}
                />
                수강생
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  value="TUTOR"
                  checked={formData.role === "TUTOR"}
                  onChange={handleChange}
                />
                강사
              </label>

              <label>
                <input
                  type="radio"
                  name="role"
                  value="ADMIN"
                  checked={formData.role === "ADMIN"}
                  onChange={handleChange}
                />
                관리자
              </label>
            </div>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="course-button-group">
            <button type="button" className="cancel-btn">
              취소
            </button>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "가입 중..." : "가입하기"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default AllUserRegisterPage;
