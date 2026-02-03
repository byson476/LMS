package com.lms.course.repository;

import java.util.List;

import jakarta.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.lms.course.entity.Course;
import com.lms.course.entity.QCourse;
import com.lms.course.entity.QCourseEnrollment;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class CourseEnrollmentRepositoryImpl
        implements CourseEnrollmentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QCourseEnrollment courseEnrollment =
            QCourseEnrollment.courseEnrollment;
    private final QCourse course = QCourse.course;

    public CourseEnrollmentRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Course> findCoursesByStudent(String studentId) {
        return queryFactory
            .select(course)
            .from(courseEnrollment)
            .join(courseEnrollment.course, course)
            .where(courseEnrollment.student.studentId.eq(studentId))
            .fetch();
    }
}
