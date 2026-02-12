package com.lms.user;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.user.dto.AdminTutorSelectListDto;
import com.lms.user.repository.TutorRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class TutorServiceImpl implements TutorService {
	@Autowired
	TutorRepository tutorRepository;

	// 관리자 강의 등록화면 - 강사 선택 목록
	@Override
	@Transactional
	public List<AdminTutorSelectListDto> findAminTutorlist() throws Exception {
		List<AdminTutorSelectListDto> tutors = tutorRepository.findAllAdminTutorSelectListDto();
		return tutors;
	}



}
