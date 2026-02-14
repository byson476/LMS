package com.lms.user;

import java.util.List;

import com.lms.user.dto.AdminStudentlistDto;


import jakarta.transaction.Transactional;

@Transactional
public interface StudentService {
	// 관리자 - 수강생 목록
	List<AdminStudentlistDto> findAdminStudentlist() throws Exception;
	// 관리자 - 수강생 한명 삭제
	void deleteStudent(String studentId) throws Exception;
}