package com.lms.course;

import java.util.List;

import com.lms.course.dto.CourseDto;
import com.lms.course.dto.CourseWithStudentCountDto;
import com.lms.course.dto.TutorCoursesWithStudentCountDto;
import com.lms.course.dto.StudentListForCourseTutorDto;
import com.lms.course.dto.TutorStudentListDto;

import jakarta.transaction.Transactional;

@Transactional
public interface CourseService  {
	// 강사 - TutorID로 강의별 학생수 가져옴
    public List <TutorCoursesWithStudentCountDto> findTutorCourselist(String userId) throws Exception;

}