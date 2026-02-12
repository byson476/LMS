package com.lms.user.controller;

import java.nio.charset.Charset;
import java.security.Principal;
import java.util.List;
     
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.user.TutorService;
import com.lms.user.UserService;
import com.lms.user.dto.AdminTutorSelectListDto;
import com.lms.user.dto.UserDto;
import com.lms.user.entity.Tutor;
import com.lms.user.exception.ExistedUserException;
import com.lms.user.security.SecurityUser;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpSession;

/*
POST 	/user/login 		- create  user 
GET 	/user/login 		- check  user 
GET   	/user/logout		- logout user 
POST 	/user 				- create user 
PUT 	/user/{id} 			- modify user by {id}
GET 	/user/{id} 			- GETs the details of the user with {id}
GET 	/user/social/{email}- GETs the details of the social user with {email}
GET 	/user 			    - GETs the list of the user
DELETE 	/user/{id} 			- Delete the user with id 
*/

@RestController
@RequestMapping("/tutor")
public class TutorRestController {
	@Autowired
	private TutorService tutorService;

	@Operation(summary = "SecurityContext")
	@SecurityRequirement(name = "BearerAuth")
	@GetMapping("/context")
	public SecurityContext context()
			throws ExistedUserException, Exception {

		return SecurityContextHolder.getContext();
	}

	@Operation(summary = "관리자 강의 등록화면 - 강사 선택 목록")
	@SecurityRequirement(name = "BearerAuth")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')") // 권한 설정
	@GetMapping("admin_tutorlist/{userId}")
	public ResponseEntity<Response> tutor_list(@PathVariable("userId") String userId) throws Exception {
		if(!userId.equals(SecurityContextHolder.getContext().getAuthentication().getName())){
			throw new AccessDeniedException("접근 권한 없음");
		}
		System.out.println("오긴오냐????????????");
 
		List<AdminTutorSelectListDto> adminTutorSelectListDto = tutorService.findAminTutorlist();
		System.out.println("아놔~~~~~~~~~~~~~~~~~~~~" + adminTutorSelectListDto);
		Response response = new Response();
		response.setStatus(ResponseStatusCode.READ_USERS);
		response.setMessage(ResponseMessage.READ_USERS);
		response.setData(adminTutorSelectListDto);
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(new MediaType(MediaType.APPLICATION_JSON, Charset.forName("UTF-8")));
		ResponseEntity<Response> responseEntity = new ResponseEntity<Response>(response, httpHeaders, HttpStatus.OK);
		return responseEntity;
	}
}
