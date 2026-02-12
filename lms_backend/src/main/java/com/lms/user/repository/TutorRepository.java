package com.lms.user.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.lms.user.dto.AdminTutorSelectListDto;
import com.lms.user.entity.Tutor;

public interface TutorRepository extends JpaRepository<Tutor, String> {

    // 이름 기반 쿼리 (User name 기준)
    List<Tutor> findByUserName(String name);

    // JPQL 직접 작성
    @Query("SELECT new com.lms.user.dto.AdminTutorSelectListDto(t.tutorId, t.user.name) " +
           "FROM Tutor t JOIN t.user u")
    List<AdminTutorSelectListDto> findAllAdminTutorSelectListDto();
}
