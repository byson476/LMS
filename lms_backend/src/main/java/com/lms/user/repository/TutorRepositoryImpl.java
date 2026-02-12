package com.lms.user.repository;

import java.util.List;

import jakarta.persistence.EntityManager;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.lms.course.dto.StudentCourselistDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.course.dto.CourseWithStudentCountDto;
import com.lms.course.entity.QCourse;
import com.lms.course.entity.QCourseEnrollment;
import com.lms.user.dto.AdminTutorSelectListDto;
import com.lms.user.entity.QTutor;
import com.lms.user.entity.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class TutorRepositoryImpl implements TutorRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QTutor tutor = QTutor.tutor;
    private final QUser user = QUser.user;   // ⚠ userinfo 엔티티 기준


    public TutorRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }


    @Override
    public List<AdminTutorSelectListDto> findAllAdminTutorSelectListDto() {
        QTutor tutor = QTutor.tutor;

        // user는 tutor.user 경로로 접근
        return queryFactory
                .select(Projections.constructor(
                        AdminTutorSelectListDto.class,
                        tutor.user.userId,
                        tutor.user.name
                ))
                .from(tutor)
                .fetch();
    }

}
