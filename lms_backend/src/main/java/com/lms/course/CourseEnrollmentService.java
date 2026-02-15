package com.lms.course;

import java.util.List;

import com.lms.course.dto.AdminStudentCourseListDto;
import com.lms.course.dto.CourseDto;
import com.lms.course.dto.StudentCourselistDto;
import com.lms.course.dto.StudentRegistCourseEnrollmentDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.course.entity.CourseEnrollment;
import com.lms.course.dto.CourseWithStudentCountDto;
import com.lms.course.dto.StudentCourseenrollmentlisDto;
import com.lms.user.entity.Student;

import jakarta.transaction.Transactional;

@Transactional
public interface CourseEnrollmentService  {
    // 학생 - StudentID로 수강중인 강의리스트 가져옴
    public List <StudentCourselistDto> findStudentCourselist(String userId) throws Exception;
    // 강사 - CourseID로 수강중인 학생리스트 가져옴
    public List <TutorStudentListDto> findStudentsByCourse(Long courseId) throws Exception;
    // 관리자 - 수강생 목록>>수강생의 수강 내역
    public List <AdminStudentCourseListDto> findAdminStudentCourse(String studentId) throws Exception;
    //학생 - 수강신청 / 강좌 등록
    public void registCourseEnrollment(StudentRegistCourseEnrollmentDto studentRegistCourseEnrollmentDto) throws Exception;
    // 학생 - 수강신청 / 강좌 등록 >> StudentID로 수강중인 강의리스트 가져옴
    public List <StudentCourseenrollmentlisDto> findStudentCourseenrollmentlist(String userId) throws Exception;
}
