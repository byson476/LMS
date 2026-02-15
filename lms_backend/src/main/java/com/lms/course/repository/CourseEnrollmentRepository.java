package com.lms.course.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lms.course.dto.StudentCourselistDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.course.dto.AdminStudentCourseListDto;
import com.lms.course.dto.CourseWithStudentCountDto;
import com.lms.course.dto.StudentCourseenrollmentlisDto;
import com.lms.course.entity.CourseEnrollment;




public interface CourseEnrollmentRepository extends JpaRepository<CourseEnrollment, Integer> {
    List<StudentCourselistDto> findCourseEnrollmentsByStudent(String studentId);
    List<TutorStudentListDto> findStudentsByCourse(Long courseId);
    //관리자 - 수강생 목록>>수강생의 수강 내역
    List<AdminStudentCourseListDto> findAdminStudentCourse(String studentId);
    // 학생 - 수강신청 / 강좌 등록 >> StudentID로 수강중인 강의리스트 가져옴
@Query("""
    SELECT new com.lms.course.dto.StudentCourseenrollmentlisDto(
        e.course.courseId
    )
    FROM CourseEnrollment e
    WHERE e.student.studentId = :studentId
""")
List<StudentCourseenrollmentlisDto> 
findStudentCourseenrollmentlist(@Param("studentId") String studentId);

}
 