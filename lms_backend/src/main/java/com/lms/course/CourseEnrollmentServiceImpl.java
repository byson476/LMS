package com.lms.course;

import java.util.ArrayList;
import java.util.List;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.lms.course.dto.CourseDto;
import com.lms.course.dto.StudentCourselistDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.course.dto.CourseWithStudentCountDto;
import com.lms.course.entity.Course;
import com.lms.course.repository.CourseEnrollmentRepository;
import com.lms.course.repository.CourseRepository;
import com.lms.user.entity.Student;
import com.lms.user.entity.Tutor;
import com.lms.user.repository.StudentRepository;
import com.lms.user.repository.TutorRepository;

import lombok.Builder;


import jakarta.transaction.Transactional;

@Builder
@Service
public class CourseEnrollmentServiceImpl implements CourseEnrollmentService{
    @Autowired
    private CourseEnrollmentRepository courseEnrollmentRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private TutorRepository tutorRepository;
    
    @Override
    @Transactional
    public List<StudentCourselistDto> findStudentCourselist(String userId) throws Exception {
        Student studentEntity = studentRepository.findById(userId).orElseThrow(() -> new RuntimeException("학생 없음"));
        List<StudentCourselistDto> studentCourselistDtos = courseEnrollmentRepository.findCourseEnrollmentsByStudent(studentEntity.getStudentId());
            return studentCourselistDtos;
    }

    @Override
    @Transactional
    public List<TutorStudentListDto> findStudentsByCourse(Long courseId) {
        Course courseEntity = courseRepository.findById(courseId.intValue()).orElseThrow(() -> new RuntimeException("강의 없음"));
        List<TutorStudentListDto> students = courseEnrollmentRepository.findStudentsByCourse(courseEntity.getCourseId());
        return students;
    }
}
