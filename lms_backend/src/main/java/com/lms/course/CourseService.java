package com.lms.course;

import java.util.List;

import com.lms.course.dto.AdminCourseRegistDto;
import com.lms.course.dto.AdminCourselistDto;
import com.lms.course.dto.StudentRegistCourselistDto;
import com.lms.course.dto.TutorCoursesWithStudentCountDto;
import com.lms.course.entity.CourseEnrollment;

import jakarta.transaction.Transactional;

@Transactional
public interface CourseService  {
	// 강사 - TutorID로 강의별 학생수 가져옴
    public List <TutorCoursesWithStudentCountDto> findTutorCourselist(String userId) throws Exception;

    //관리자 - 전체 강의리스트 가져옴
    public List <AdminCourselistDto> findAdminCourselist() throws Exception;

    //관리자 - 강좌 한개 삭제
    public void deleteCourse(Long courseId) throws Exception;

    //관리자/강사 - 강좌 등록
    public void registCourse(AdminCourseRegistDto adminCourseRegistDto) throws Exception;

    //학생 - 수강신청 / 강좌검색
    public List <StudentRegistCourselistDto>  findStudentCourseList() throws Exception;
}