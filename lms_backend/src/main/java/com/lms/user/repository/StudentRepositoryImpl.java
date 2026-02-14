package com.lms.user.repository;

import java.util.List;

import jakarta.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import com.lms.user.dto.AdminStudentlistDto;
import com.lms.user.entity.QStudent;
import com.lms.user.entity.QUser;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class StudentRepositoryImpl implements StudentRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    private final QStudent student = QStudent.student;
    private final QUser user = QUser.user;   // userinfo 엔티티

    public StudentRepositoryImpl(EntityManager em) {
        this.queryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<AdminStudentlistDto> findAdminStudentlist() {

        return queryFactory
                .select(Projections.constructor(
                        AdminStudentlistDto.class,
                        student.studentId,   // s.studentid
                        user.name,           // ui.name
                        user.email           // ui.email
                ))
                .from(student)
                .join(user)
                .on(student.studentId.eq(user.userId))  // s.studentid = ui.userid
                .fetch();
    }
}
