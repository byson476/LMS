package com.lms.course.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.course.entity.Course;



public interface CourseRepository extends JpaRepository<Course, Integer> {
}
