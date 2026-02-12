package com.lms.course.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.lms.course.dto.AdminCourselistDto;
import com.lms.course.dto.CourseWithStudentCountDto;
import com.lms.course.dto.TutorCoursesWithStudentCountDto;
import com.lms.course.dto.StudentListForCourseTutorDto;
import com.lms.course.entity.Course;
import com.lms.user.entity.Tutor;



public interface CourseRepository extends JpaRepository<Course, Integer> {
        @Query("""
        SELECT new com.lms.course.dto.TutorCoursesWithStudentCountDto(
            c.courseId courseId,
            c.title title,
            c.description description,
            COUNT(e) totalStudents
        )
        FROM Course c
        LEFT JOIN c.enrollments e
        WHERE c.tutor.tutorId = :tutorId
        GROUP BY c.courseId, c.title, c.description
    """)
    List<TutorCoursesWithStudentCountDto> findCoursesWithStudentCountByTutor(@Param("tutorId") String tutorId);

    @Query("""
        SELECT new com.lms.course.dto.AdminCourselistDto(
            c.courseId,
            u.name,
            c.title,
            c.description,
            COUNT(e)
        )
        FROM Course c
        JOIN c.tutor t
        JOIN t.user u
        LEFT JOIN c.enrollments e
        GROUP BY c.courseId, u.name, c.title, c.description
    """)
    List<AdminCourselistDto> findAdminCourseList();


}
