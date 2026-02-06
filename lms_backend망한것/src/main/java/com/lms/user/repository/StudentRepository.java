package com.lms.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.user.entity.Student;


public interface StudentRepository extends JpaRepository<Student, String> {
}
