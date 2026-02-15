package com.lms.user;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.user.dto.AdminTutorListDto;
import com.lms.user.dto.AdminTutorSelectListDto;
import com.lms.user.entity.Student;
import com.lms.user.entity.Tutor;
import com.lms.user.entity.User;
import com.lms.user.repository.TutorRepository;
import com.lms.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class TutorServiceImpl implements TutorService {
	@Autowired
	TutorRepository tutorRepository;
	@Autowired
	UserRepository userRepository;

	// 관리자 강의 등록화면 - 강사 선택 목록
	@Override
	@Transactional
	public List<AdminTutorSelectListDto> findAminSelectTutorlist() throws Exception {
		List<AdminTutorSelectListDto> tutors = tutorRepository.findAllAdminTutorSelectListDto();
		return tutors;
	}
	// 관리자 강사 목록
	@Override
	@Transactional
	public List<AdminTutorListDto> findAminTutorlist() throws Exception {
		List<AdminTutorListDto> tutors = tutorRepository.findAllAdminTutorListDto();
		return tutors;
	}
	//관리자 - 강사 한명 삭제
	@Override
	@Transactional
	public void deleteTutor(String tutorId) throws Exception {
		Tutor tutorEntity = tutorRepository.findById(tutorId).orElseThrow(() -> new RuntimeException("강사 없음"));
		User userEntity = userRepository.findById(tutorId).orElseThrow(() -> new RuntimeException("사용자 없음"));
		tutorRepository.delete(tutorEntity);
		userRepository.delete(userEntity);
	}



}
