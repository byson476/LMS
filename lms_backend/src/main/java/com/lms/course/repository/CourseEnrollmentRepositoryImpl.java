package com.lms.course.repository;

import java.util.List;

import jakarta.persistence.EntityManager;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.lms.course.dto.StudentCourselistDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.course.dto.AdminStudentCourseListDto;
import com.lms.course.dto.CourseWithStudentCountDto;
import com.lms.course.dto.StudentCourseenrollmentlisDto;
import com.lms.course.entity.QCourse;
import com.lms.course.entity.QCourseEnrollment;
import com.lms.user.entity.QTutor;
import com.lms.user.entity.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
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

    @Override
    public List<StudentCourselistDto> findCourseEnrollmentsByStudent(String studentId) {
        return queryFactory
            .select(Projections.constructor(
                com.lms.course.dto.StudentCourselistDto.class,
                courseEnrollment.enrolledDate,
                course.courseId,
                courseEnrollment.enrollmentId,
                courseEnrollment.status,
                courseEnrollment.student.studentId,
                user.name,
                course.title,
                course.description
            ))
            .from(courseEnrollment)
            .join(courseEnrollment.course, course)
            .join(course.tutor, tutor)
            .join(tutor.user, user)
            .where(courseEnrollment.student.studentId.eq(studentId))
            .fetch();
    }


    @Override
    public List<TutorStudentListDto> findStudentsByCourse(Long courseId) {
        return queryFactory
        .select(Projections.constructor(
            TutorStudentListDto.class,
            courseEnrollment.student.studentId,
            user.name,
            user.email,
            Expressions.stringTemplate(
                "to_char({0}, 'YYYY-MM-DD')",
                courseEnrollment.enrolledDate
            )
        ))
        .from(courseEnrollment)
        .join(user).on(courseEnrollment.student.studentId.eq(user.userId))
        .where(courseEnrollment.course.courseId.eq(courseId))
        .fetch();

        }

        
    //관리자 - 수강생 목록>>수강생의 수강 내역
    @Override
    public List<AdminStudentCourseListDto> findAdminStudentCourse(String studentId) {
    QCourseEnrollment ce = QCourseEnrollment.courseEnrollment;
    QCourse c = QCourse.course;
    QTutor t = QTutor.tutor;
    QUser u = QUser.user;

    return queryFactory
            .select(Projections.constructor(
                    AdminStudentCourseListDto.class,
                    c.courseId,
                    ce.enrolledDate,
                    c.title,
                    c.description,
                    u.name
            ))
            .from(ce)
            .join(ce.course, c)
            .join(c.tutor, t)
            .join(t.user, u)
            .where(ce.student.user.userId.eq(studentId))
            .fetch();
    }
}
