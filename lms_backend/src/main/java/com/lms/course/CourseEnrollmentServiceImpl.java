package com.lms.course;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.lms.course.dto.AdminStudentCourseListDto;
import com.lms.course.dto.CourseDto;
import com.lms.course.dto.StudentCourselistDto;
import com.lms.course.dto.StudentRegistCourseEnrollmentDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.course.dto.CourseWithStudentCountDto;
import com.lms.course.dto.StudentCourseenrollmentlisDto;
import com.lms.course.entity.Course;
import com.lms.course.entity.CourseEnrollment;
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

    // 관리자 - 수강생 목록>>수강생의 수강 내역
    @Override
    @Transactional
    public List<AdminStudentCourseListDto> findAdminStudentCourse(String studentId) throws Exception {
        Student studentEntity = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("학생 없음"));
        List<AdminStudentCourseListDto> studentCourseList = courseEnrollmentRepository.findAdminStudentCourse(studentEntity.getStudentId());
            return studentCourseList;        
    }

    //학생 - 수강신청 / 강좌 등록
    @Override
    @Transactional
    public void registCourseEnrollment(StudentRegistCourseEnrollmentDto studentRegistCourseEnrollmentDto) throws Exception {
        Student studentEntity = studentRepository.findById(studentRegistCourseEnrollmentDto.getUserId()).orElseThrow(() -> new RuntimeException("학생 없음"));
        Course courseEntity = courseRepository.findById(studentRegistCourseEnrollmentDto.getCourseId().intValue()).orElseThrow(() -> new RuntimeException("강의 없음"));
		
		CourseEnrollment courseEnrollmentEntity = CourseEnrollment.builder()
				.enrolledDate(java.sql.Date.valueOf(LocalDate.now()))
				.status(1L)
				.student(studentEntity)
				.course(courseEntity)
				.build();        
        courseEnrollmentRepository.save(courseEnrollmentEntity);
    }

    // 학생 - 수강신청 / 강좌 등록 >> StudentID로 수강중인 강의리스트 가져옴
    @Override
    public List<StudentCourseenrollmentlisDto> findStudentCourseenrollmentlist(String userId) throws Exception {
        Student studentEntity = studentRepository.findById(userId).orElseThrow(() -> new RuntimeException("학생 없음"));
        List<StudentCourseenrollmentlisDto> studentCourseenrollmentlisDto = courseEnrollmentRepository.findStudentCourseenrollmentlist(userId);
        return studentCourseenrollmentlisDto;
    }
    
}
