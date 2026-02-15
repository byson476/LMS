package com.lms.user;

import java.util.List;

import com.lms.user.dto.AdminTutorListDto;
import com.lms.user.dto.AdminTutorSelectListDto;


import jakarta.transaction.Transactional;

@Transactional
public interface TutorService {
	// 관리자 강의 등록화면 - 강사 선택 목록
	List<AdminTutorSelectListDto> findAminSelectTutorlist() throws Exception;
	// 관리자 강사 목록
	List<AdminTutorListDto> findAminTutorlist() throws Exception;
	//관리자 - 강사 한명 삭제
	void deleteTutor(String tutorId) throws Exception;
}