package com.lms.course.repository;

import java.util.List;

import com.lms.course.dto.StudentCourselistDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.course.dto.AdminStudentCourseListDto;
import com.lms.course.dto.CourseWithStudentCountDto;
import com.lms.course.entity.Course;
import com.lms.course.entity.CourseEnrollment;

public interface CourseEnrollmentRepositoryCustom {
    List<StudentCourselistDto> findCourseEnrollmentsByStudent(String studentId);
    List<TutorStudentListDto> findStudentsByCourse(Long courseId);
    //관리자 - 수강생 목록>>수강생의 수강 내역
    List<AdminStudentCourseListDto> findAdminStudentCourse(String studentId);
}
