package com.lms.user;

import java.util.List;

import com.lms.user.dto.AdminAllUserRegistDto;
import com.lms.user.dto.UserDto;
import com.lms.user.exception.ExistedUserException;

import jakarta.transaction.Transactional;

@Transactional
public interface UserService {
	//관리자 - 학생 회원가입
	void registStudentUser(AdminAllUserRegistDto adminAllUserRegistDto) throws ExistedUserException, Exception;
	//관리자 - 강사 회원가입
	void registTutorUser(AdminAllUserRegistDto adminAllUserRegistDto) throws ExistedUserException, Exception;
	//관리자 - 관리자 회원가입
	void registAdminUser(AdminAllUserRegistDto adminAllUserRegistDto) throws ExistedUserException, Exception;


	/*
	 * Kakao
	 */
	UserDto getKakaoMember(String accessToken);

	/*
	 * 회원가입
	 */
	int create(UserDto userDto) throws ExistedUserException, Exception;

	/*
	 * 회원상세보기
	 */
	UserDto findUser(String userId) throws Exception;

	/*
	 * 회원상세보기
	 */
	UserDto findUserByEmail(String email) throws Exception;

	/*
	 * 회원수정
	 */
	int update(UserDto user) throws Exception;

	/*
	 * 회원탈퇴
	 */
	int remove(String userId) throws Exception;

	/*
	 * 회원리스트
	 */
	List<UserDto> findUserList() throws Exception;

	/*
	 * 아이디중복체크
	 */
	boolean isDuplicateId(String userId) throws Exception;

}