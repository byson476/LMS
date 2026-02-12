package com.lms.course;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.course.dto.AdminCourselistDto;
import com.lms.course.dto.CourseDto;
import com.lms.course.dto.TutorCoursesWithStudentCountDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.course.dto.StudentListForCourseTutorDto;
import com.lms.course.entity.Course;
import com.lms.course.repository.CourseRepository;
import com.lms.user.entity.Tutor;
import com.lms.user.repository.TutorRepository;

import lombok.Builder;


import jakarta.transaction.Transactional;

@Builder
@Service
public class CourseServiceImpl implements CourseService{
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private TutorRepository tutorRepository;

    @Override
    @Transactional
    public List<TutorCoursesWithStudentCountDto> findTutorCourselist(String userId) throws Exception {
        Tutor tutorEntity = tutorRepository.findById(userId).orElseThrow(() -> new RuntimeException("튜터 없음"));
        List<TutorCoursesWithStudentCountDto> courses = courseRepository.findCoursesWithStudentCountByTutor(tutorEntity.getTutorId());
        return courses;
    }

    @Override
    @Transactional
    public List<AdminCourselistDto> findAdminCourselist() throws Exception {
        List<AdminCourselistDto> courses = courseRepository.findAdminCourseList();
        return courses;
    }

   //관리자 - 강좌 한개 삭제
    @Override
    @Transactional
    public void deleteCourse(Long courseId) throws Exception {
        Course courserEntity = courseRepository.findById(courseId.intValue()).orElseThrow(() -> new RuntimeException("강좌 없음"));
        courseRepository.deleteById(courserEntity.getCourseId().intValue());
    }
    
}
