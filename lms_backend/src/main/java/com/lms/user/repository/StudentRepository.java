package com.lms.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.user.dto.AdminStudentlistDto;
import com.lms.user.entity.Student;


public interface StudentRepository extends JpaRepository<Student, String> {
    List<AdminStudentlistDto> findAdminStudentlist();
}
