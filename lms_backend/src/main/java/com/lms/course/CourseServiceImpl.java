package com.lms.course;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.course.dto.AdminCourseRegistDto;
import com.lms.course.dto.AdminCourselistDto;
import com.lms.course.dto.CourseDto;
import com.lms.course.dto.TutorCoursesWithStudentCountDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.course.dto.StudentListForCourseTutorDto;
import com.lms.course.dto.StudentRegistCourselistDto;
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
public class CourseServiceImpl implements CourseService{
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseEnrollmentRepository courseEnrollmentRepository;
    @Autowired
    private TutorRepository tutorRepository;
    @Autowired
    private StudentRepository studentRepository;

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

    //관리자/강사 - 강좌 등록
    @Override
    @Transactional
    public void registCourse(AdminCourseRegistDto adminCourseRegistDto) throws Exception {
        Tutor tutorEntity = tutorRepository.findById(adminCourseRegistDto.getTutorId()).orElseThrow(() -> new RuntimeException("튜터 없음"));
        String startDateStr = adminCourseRegistDto.getStartDate(); // 예: "2026-02-12"

        // 원하는 형식 지정 (YYYY-MM-DD)
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date utilDate = sdf.parse(startDateStr); // java.util.Date로 변환

        Course courseEntity = Course.builder()
                    .courseId(null)
                    .title(adminCourseRegistDto.getTitle())
                    .description(adminCourseRegistDto.getDescription())
                    .maxStudents(adminCourseRegistDto.getMaxStudents())
                    .startdate(utilDate)
                    .tutor(tutorEntity)
                    .build();

        courseRepository.save(courseEntity);
    }

    //학생 - 수강신청 / 강좌검색
    @Override
    @Transactional
    public List <StudentRegistCourselistDto>  findStudentCourseList() throws Exception {
        List <StudentRegistCourselistDto> studentRegistCourselistDto = courseRepository.findStudentRegistCourselist();
        return studentRegistCourselistDto;
    }
}
