package com.lms.course;

import java.util.List;

import com.lms.course.dto.AdminCourselistDto;
import com.lms.course.dto.TutorCoursesWithStudentCountDto;

import jakarta.transaction.Transactional;

@Transactional
public interface CourseService  {
	// 강사 - TutorID로 강의별 학생수 가져옴
    public List <TutorCoursesWithStudentCountDto> findTutorCourselist(String userId) throws Exception;

    //관리자 - 전체 강의리스트 가져옴
    public List <AdminCourselistDto> findAdminCourselist() throws Exception;

    //관리자 - 강좌 한개 삭제
    public void deleteCourse(Long courseId) throws Exception;
}