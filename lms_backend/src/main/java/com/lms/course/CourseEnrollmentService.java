package com.lms.course;

import java.util.List;

import com.lms.course.dto.CourseDto;
import com.lms.course.dto.StudentCourselistDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.course.dto.CourseWithStudentCountDto;
import com.lms.user.entity.Student;

import jakarta.transaction.Transactional;

@Transactional
public interface CourseEnrollmentService  {
    // 학생 - StudentID로 수강중인 강의리스트 가져옴
    public List <StudentCourselistDto> findStudentCourselist(String userId) throws Exception;
    // 강사 - CourseID로 수강중인 학생리스트 가져옴
    public List <TutorStudentListDto> findStudentsByCourse(Long courseId) throws Exception;
}
