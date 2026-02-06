package com.lms.course.repository;

import java.util.List;

import jakarta.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.lms.course.dto.CourseEnrollmentDto;
import com.lms.course.dto.CourseEnrollmentViewDto;
import com.lms.course.entity.Course;
import com.lms.course.entity.CourseEnrollment;
import com.lms.course.entity.QCourse;
import com.lms.course.entity.QCourseEnrollment;
import com.lms.user.entity.QStudent;
import com.lms.user.entity.QTutor;
import com.lms.user.entity.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class CourseEnrollmentRepositoryImpl implements CourseEnrollmentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

private final QCourseEnrollment courseEnrollment = QCourseEnrollment.courseEnrollment;
private final QCourse course = QCourse.course;
private final QTutor tutor = QTutor.tutor;
private final QUser user = QUser.user;   // ⚠ userinfo 엔티티 기준


    public CourseEnrollmentRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }
/* 
    @Override
    public List<Course> findCoursesByStudent(String studentId) {
        return queryFactory
            .select(course)
            .from(courseEnrollment)
            .join(courseEnrollment.course, course)
            .where(courseEnrollment.student.studentId.eq(studentId))
            .fetch();
    }
        */
    @Override
    public List<CourseEnrollmentViewDto> findCourseEnrollmentsByStudent(String studentId) {

        return queryFactory
            .select(Projections.constructor(
                CourseEnrollmentViewDto.class,
                courseEnrollment.enrolledDate,
                course.courseId,
                courseEnrollment.enrollmentId,
                courseEnrollment.status,
                courseEnrollment.student.sutdentId,
                user.name,
                course.title,
                course.description
            ))
            .from(courseEnrollment)
            .join(courseEnrollment.course, course)
            .join(course.tutor, tutor)
            .join(tutor.user, user)
            .where(courseEnrollment.student.sutdentId.eq(studentId))
            .fetch();
    }

    @Override
    public List<CourseEnrollmentViewDto> findCourseEnrollmentsByTutor(String tutorId) {
        return queryFactory
            .select(Projections.constructor(
                CourseEnrollmentViewDto.class,
                courseEnrollment.enrolledDate,
                course.courseId,
                courseEnrollment.enrollmentId,
                courseEnrollment.status,
                courseEnrollment.student.sutdentId,
                user.name,
                course.title,
                course.description
            ))
            .from(courseEnrollment)
            .join(courseEnrollment.course, course)
            .join(course.tutor, tutor)
            .join(courseEnrollment.student.user, user)
            .where(tutor.tutorId.eq(tutorId))
            .fetch();
    }

}
