package com.lms.course.controller;

import java.nio.charset.Charset;
import java.util.List;
     
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.lms.course.CourseEnrollmentService;
import com.lms.course.CourseService;
import com.lms.course.dto.AdminStudentCourseListDto;
import com.lms.course.dto.StudentCourselistDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.user.controller.Response;
import com.lms.user.exception.ExistedUserException;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

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
@RequestMapping("/coursee")
public class CourseEnrollmentRestController {
	@Autowired
	private CourseEnrollmentService courseEnrollmentService;
	@Autowired
	private CourseService courseService;

	@Operation(summary = "SecurityContext")
	@SecurityRequirement(name = "BearerAuth")
	@GetMapping("/context")
	public SecurityContext context()
			throws ExistedUserException, Exception {

		return SecurityContextHolder.getContext();
	}

	@Operation(summary = "학생 - 수강 강좌 목록 보기")
	@SecurityRequirement(name = "BearerAuth")
	@GetMapping("student_courselist/{userId}")
	@PreAuthorize("hasAnyRole('ROLE_STUDENT')")
	public ResponseEntity<Response> findStudentCourselist(@PathVariable("userId") String userId)throws Exception {
		if(!userId.equals(SecurityContextHolder.getContext().getAuthentication().getName())){
			throw new AccessDeniedException("접근 권한 없음");
		}
		Response response = new Response();
		response.setStatus(ResponseStatusCode.COURSE_SUCCESS);
		response.setMessage(ResponseMessage.COURSE_SUCCESS);
		List <StudentCourselistDto> studentCourselistDto = courseEnrollmentService.findStudentCourselist(userId);
		response.setData(studentCourselistDto);
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(new MediaType(MediaType.APPLICATION_JSON, Charset.forName("UTF-8")));
		ResponseEntity<Response> responseEntity = new ResponseEntity<Response>(response, httpHeaders, HttpStatus.OK);
		return responseEntity;
	}

	@Operation(summary = "강사 - CourseID로 수강중인 학생리스트 가져옴")
	@SecurityRequirement(name = "BearerAuth")
	@GetMapping("tutor_students/{userId}")
	@PreAuthorize("hasAnyRole('ROLE_TUTOR')")
	public ResponseEntity<Response> findStudentsByCourse(@PathVariable("userId") String userId, @RequestParam("courseId") String courseId)throws Exception {
		if(!userId.equals(SecurityContextHolder.getContext().getAuthentication().getName())){
			throw new AccessDeniedException("접근 권한 없음");
		}
		Response response = new Response();
		response.setStatus(ResponseStatusCode.COURSE_SUCCESS);
		response.setMessage(ResponseMessage.COURSE_SUCCESS);
		
		List <TutorStudentListDto> tutorStudentList = courseEnrollmentService.findStudentsByCourse(Long.valueOf(courseId));
			System.out.println("##############################tutorStudentList:"+tutorStudentList);
		response.setData(tutorStudentList);
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(new MediaType(MediaType.APPLICATION_JSON, Charset.forName("UTF-8")));
		ResponseEntity<Response> responseEntity = new ResponseEntity<Response>(response, httpHeaders, HttpStatus.OK);
		return responseEntity;
	}


	@Operation(summary = "관리자 - 수강생 목록>>수강생의 수강 내역")
	@SecurityRequirement(name = "BearerAuth")
	@GetMapping("admin_courselist/{userId}")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<Response> findAdminStudentCourse(@PathVariable("userId") String userId, @RequestParam("studentId") String studentId)throws Exception {
		System.out.println("1아..짱나"+userId);
		if(!userId.equals(SecurityContextHolder.getContext().getAuthentication().getName())){
			throw new AccessDeniedException("접근 권한 없음");
		}
		System.out.println("2아..짱나" + studentId);
		Response response = new Response();
		response.setStatus(ResponseStatusCode.COURSE_SUCCESS);
		response.setMessage(ResponseMessage.COURSE_SUCCESS);
		
		List <AdminStudentCourseListDto> courseList = courseEnrollmentService.findAdminStudentCourse(studentId);
			System.out.println("##############################tutorStudentList:"+courseList);
		response.setData(courseList);
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setContentType(new MediaType(MediaType.APPLICATION_JSON, Charset.forName("UTF-8")));
		ResponseEntity<Response> responseEntity = new ResponseEntity<Response>(response, httpHeaders, HttpStatus.OK);
		return responseEntity;
	}
}
