package com.lms.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.user.entity.Tutor;

public interface TutorRepository extends JpaRepository<Tutor, String> {
}
