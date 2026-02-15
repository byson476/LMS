package com.lms.course.controller;

import java.nio.charset.Charset;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.course.CourseService;
import com.lms.course.dto.AdminCourseRegistDto;
import com.lms.course.dto.AdminCourselistDto;
import com.lms.course.dto.StudentRegistCourselistDto;
import com.lms.course.dto.TutorCoursesWithStudentCountDto;
import com.lms.user.controller.Response;
import com.lms.user.exception.ExistedUserException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;;

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
@RequestMapping("/course")
public class CourseRestController {
	@Autowired
	private CourseService courseService;

	@Operation(summary = "SecurityContext")
	@SecurityRequirement(name = "BearerAuth")
	@GetMapping("/context")
	public SecurityContext context()
			throws ExistedUserException, Exception {

		return SecurityContextHolder.getContext();
	}
	
	@Operation(summary = "학생 - 수강신청 / 강좌검색")
	@SecurityRequirement(name = "BearerAuth")
	@GetMapping("student_courselist/{userId}")
	@PreAuthorize("hasAnyRole('ROLE_STUDENT')")
	public ResponseEntity<Response> findStudentCourseList(@PathVariable("userId") String userId)throws Exception {
		if(!userId.equals(SecurityContextHolder.getContext().getAuthentication().getName())){
			throw new AccessDeniedException("접근 권한 없음");
		}
		Response response = new Response();
		response.setStatus(ResponseStatusCode.COURSE_SUCCESS);
		response.setMessage(ResponseMessage.COURSE_SUCCESS);
		List <StudentRegistCourselistDto> studentRegistCourselistDto = courseService.findStudentCourseList();
		response.setData(studentRegistCourselistDto);
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(new MediaType(MediaType.APPLICATION_JSON, Charset.forName("UTF-8")));
		ResponseEntity<Response> responseEntity = new ResponseEntity<Response>(response, httpHeaders, HttpStatus.OK);
		return responseEntity;
	}

	@Operation(summary = "강사 - 개설 강좌 목록 보기")
	@SecurityRequirement(name = "BearerAuth")
	@GetMapping("tutor_courselist/{userId}")
	@PreAuthorize("hasAnyRole('ROLE_TUTOR')")
	public ResponseEntity<Response> findTutorCourselist(@PathVariable("userId") String userId)throws Exception {
		if(!userId.equals(SecurityContextHolder.getContext().getAuthentication().getName())){
			throw new AccessDeniedException("접근 권한 없음");
		}
		Response response = new Response();
		response.setStatus(ResponseStatusCode.COURSE_SUCCESS);
		response.setMessage(ResponseMessage.COURSE_SUCCESS);
		List <TutorCoursesWithStudentCountDto> courseWithStudentCountDtoList = courseService.findTutorCourselist(userId);
		response.setData(courseWithStudentCountDtoList);
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(new MediaType(MediaType.APPLICATION_JSON, Charset.forName("UTF-8")));
		ResponseEntity<Response> responseEntity = new ResponseEntity<Response>(response, httpHeaders, HttpStatus.OK);
		return responseEntity;
	}
	
	@Operation(summary = "관리자 - 전체 강좌 목록 보기")
	@SecurityRequirement(name = "BearerAuth")
	@GetMapping("admin_courselist/{userId}")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<Response> findAdminCourselist(@PathVariable("userId") String userId)throws Exception {
		if(!userId.equals(SecurityContextHolder.getContext().getAuthentication().getName())){
			throw new AccessDeniedException("접근 권한 없음");
		}
		Response response = new Response();
		response.setStatus(ResponseStatusCode.COURSE_SUCCESS);
		response.setMessage(ResponseMessage.COURSE_SUCCESS);
		List <AdminCourselistDto> courseWithStudentCountDtoList = courseService.findAdminCourselist();
		response.setData(courseWithStudentCountDtoList);
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(new MediaType(MediaType.APPLICATION_JSON, Charset.forName("UTF-8")));
		ResponseEntity<Response> responseEntity = new ResponseEntity<Response>(response, httpHeaders, HttpStatus.OK);
		return responseEntity;
	}

	@Operation(summary = "관리자 - 강좌 한개 삭제")
	@SecurityRequirement(name = "BearerAuth")
	@DeleteMapping(value = "/admin_deletecourse/{userId}")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<Response> deleteCourse(@PathVariable("userId") String userId, @RequestParam("courseId") String courseId)throws Exception {
		if(!userId.equals(SecurityContextHolder.getContext().getAuthentication().getName())){
			throw new AccessDeniedException("접근 권한 없음");
		}
		Response response = new Response();
		response.setStatus(ResponseStatusCode.COURSE_SUCCESS);
		response.setMessage(ResponseMessage.COURSE_SUCCESS);
		courseService.deleteCourse(Long.parseLong(courseId));
		response.setData(null);
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(new MediaType(MediaType.APPLICATION_JSON, Charset.forName("UTF-8")));
		ResponseEntity<Response> responseEntity = new ResponseEntity<Response>(response, httpHeaders, HttpStatus.OK);
		return responseEntity; 
	}

	@Operation(summary = "관리자/강사 - 강좌 등록")
	@PostMapping(value="/admin_registcourse")
	@PreAuthorize("hasAnyRole('ROLE_TUTOR', 'ROLE_ADMIN')")
	public ResponseEntity<Response> registCourse(@RequestBody AdminCourseRegistDto adminCourseRegistDto)throws Exception {
		if(adminCourseRegistDto==null)
			throw new AccessDeniedException("접근 권한 없음");

		String userId = adminCourseRegistDto.getUserId();
		if(!userId.equals(SecurityContextHolder.getContext().getAuthentication().getName())){
			throw new AccessDeniedException("접근 권한 없음");
		}
		Response response = new Response();
		response.setStatus(ResponseStatusCode.COURSE_SUCCESS);
		response.setMessage(ResponseMessage.COURSE_SUCCESS);
		courseService.registCourse(adminCourseRegistDto);
		response.setData(null);
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(new MediaType(MediaType.APPLICATION_JSON, Charset.forName("UTF-8")));
		ResponseEntity<Response> responseEntity = new ResponseEntity<Response>(response, httpHeaders, HttpStatus.OK);
		return responseEntity;  
	}
}
