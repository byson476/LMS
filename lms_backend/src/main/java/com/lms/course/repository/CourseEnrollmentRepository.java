package com.lms.course.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.course.dto.StudentCourselistDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.course.dto.CourseWithStudentCountDto;
import com.lms.course.entity.CourseEnrollment;



public interface CourseEnrollmentRepository extends JpaRepository<CourseEnrollment, Integer> {
    List<StudentCourselistDto> findCourseEnrollmentsByStudent(String studentId);
    List<TutorStudentListDto> findStudentsByCourse(Long courseId);
}
