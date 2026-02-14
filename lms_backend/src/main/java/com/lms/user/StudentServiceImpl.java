package com.lms.user;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.user.dto.AdminStudentlistDto;
import com.lms.user.entity.Student;
import com.lms.user.entity.Tutor;
import com.lms.user.entity.User;
import com.lms.user.repository.StudentRepository;
import com.lms.user.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;

@Service
@Log4j2
public class StudentServiceImpl implements StudentService {
	@Autowired
	StudentRepository studentRepository;
	@Autowired
	UserRepository userRepository;

	// 관리자 - 수강생 목록
	@Override
	@Transactional
	public List<AdminStudentlistDto> findAdminStudentlist() throws Exception {
		List<AdminStudentlistDto> students = studentRepository.findAdminStudentlist();
		return students;
	}

	// 관리자 - 수강생 한명 삭제
	@Override
	@Transactional
	public void deleteStudent(String studentId) throws Exception {
		Student studentEntity = studentRepository.findById(studentId).orElseThrow(() -> new RuntimeException("학생 없음"));
		User userEntity = userRepository.findById(studentId).orElseThrow(() -> new RuntimeException("사용자 없음"));
		studentRepository.delete(studentEntity);
		userRepository.delete(userEntity);
	}



}
