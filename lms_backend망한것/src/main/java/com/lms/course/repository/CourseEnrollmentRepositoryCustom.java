package com.lms.course.repository;

import java.util.List;

import com.lms.course.dto.CourseEnrollmentViewDto;
import com.lms.course.entity.Course;
import com.lms.course.entity.CourseEnrollment;

public interface CourseEnrollmentRepositoryCustom {

    /**
     * 학생이 수강 중인 강의 목록 조회
     */
    //List<Course> findCoursesByStudent(String studentId);

    List<CourseEnrollmentViewDto> findCourseEnrollmentsByStudent(String studentId);
}
