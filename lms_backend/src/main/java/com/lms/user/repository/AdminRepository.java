package com.lms.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lms.user.entity.Admin;



public interface AdminRepository extends JpaRepository<Admin, String> {
}
