package com.lms.user;

import java.util.List;

import com.lms.user.dto.UserDto;
import com.lms.user.exception.ExistedUserException;

import jakarta.transaction.Transactional;

@Transactional
public interface UserService {
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