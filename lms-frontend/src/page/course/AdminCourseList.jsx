import { useState, useContext } from "react";
import { useAdminCourseList } from '../../hooks/useCourse';
import { useAdminDeleteCourse } from '../../hooks/useCourse';
import { UserContext } from "../../App";

import "../../assets/css/course_tutor.css";

const AdminCourseList = () => {
  const { loginStatus } = useContext(UserContext);
  const userId = loginStatus?.loginUser?.userId;
  const { courseListItems, loading, error } = useAdminCourseList();
  const { deleteCourses } = useAdminDeleteCourse();
  const [selected, setSelected] = useState([]);

  /* 개별 선택 */
  const handleSelect = (courseId) => {
    setSelected(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  /* 전체 선택 */
  const handleSelectAll = () => {
    const allIds = courseListItems.map(course => course.courseId);
    setSelected(allIds);
  };

  /* 전체 해제 */
  const handleUnselectAll = () => {
    setSelected([]);
  };

const handleDelete = async () => {
  if (selected.length === 0) {
    alert("삭제할 강의를 선택하세요.");
    return;
  }

  if (!window.confirm("선택한 강의를 삭제하시겠습니까?")) return;

  try {
    await deleteCourses(selected);

    alert("삭제 완료");

    setSelected([]);  // 선택 초기화
    window.location.reload(); // 또는 목록 재조회

  } catch (e) {
    alert("삭제 실패");
  }
};


  const isAllSelected =
    courseListItems.length > 0 &&
    selected.length === courseListItems.length;

  if (loading) return <div>강의 목록을 불러오는 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="course-page">
      <header className="page-header">
        <h1>강사별 개설 강의 관리</h1>
      </header>

      <div className="button-area">
        <button className="btn-primary" onClick={handleDelete}>
          선택 삭제
        </button>
      </div>

      <section className="course-list">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={e =>
                    e.target.checked ? handleSelectAll() : handleUnselectAll()
                  }
                />
              </th>
              <th>강사명</th>
              <th>강의명</th>
              <th>강의 설명</th>
              <th>수강 학생 수</th>
            </tr>
          </thead>

<tbody>
  {courseListItems.length === 0 ? (
    <tr>
      <td colSpan="5" style={{ textAlign: "center", padding: "30px" }}>
        개설된 강의가 없습니다.
      </td>
    </tr>
  ) : (
    courseListItems.map(course => (
      <tr key={course.courseId}>
        <td>
          <input
            type="checkbox"
            checked={selected.includes(course.courseId)}
            onChange={() => handleSelect(course.courseId)}
          />
        </td>
        <td>{course.tutorName}</td>
        <td>{course.title}</td>
        <td className="course-description">
          {course.description}
        </td>
        <td>{course.studentCount}명</td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </section>
    </div>
  );
};

export default AdminCourseList;
