package com.lms.course.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.course.entity.CourseEnrollment;



public interface CourseEnrollmentRepository extends JpaRepository<CourseEnrollment, Integer> {
}
