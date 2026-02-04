package com.lms.course.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;


import org.springframework.web.bind.annotation.RestController;

import com.lms.course.CourseEnrollmentService;
import com.lms.course.dto.CourseDto;

import com.lms.user.entity.Student;

import io.swagger.v3.oas.annotations.Operation;

@RestController
public class CourseEnrollmentController {
    @Autowired
    private CourseEnrollmentService courseEnrollmentService;

	@Operation(summary = "수강 목록 조회", description = "사용자의 수강 목록을 조회합니다")
	@GetMapping(value = "/courses/{userId}")
	public ResponseEntity<Map<String, Object>> courses_list(@PathVariable(value = "userId") String userId) throws Exception {
        System.out.println("########### courses_list userId : " + userId);
		
		Student student = Student.builder()
								.studentId(userId)
								.build();
		Map<String, Object> resultMap = new HashMap<>();
		int status = 1;
		String msg = "성공";

		List <CourseDto> data = courseEnrollmentService.courseList(student);
		resultMap.put("status", status);
		resultMap.put("msg", msg);
		resultMap.put("data", data);

		return ResponseEntity
				.status(HttpStatus.OK)
				.header(HttpHeaders.CONTENT_TYPE, "application/json;charset=UTF-8")
				.body(resultMap);
	}

/* 
	@Operation(summary = "WisjList 쓰기")
	@PostMapping(value="/wishlist")
	public ResponseEntity<Map<String, Object>> cart_write_action(@RequestBody WishlistDto wishlistDto) throws Exception{
		Long wishlistId = wishlistService.wishlistWrite(wishlistDto);
		Map<String, Object> resultMap = new HashMap<>();
		int status = 1;
		Long data = wishlistId;
		String msg = "성공";

		resultMap.put("status", status);
		resultMap.put("msg", msg);
		resultMap.put("data", wishlistId);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.header(HttpHeaders.CONTENT_TYPE, "application/json;charset=UTF-8")
				.body(resultMap);
	}


	@Operation(summary = "WishList 리스트", description = "WishList 전체를 조회합니다")
	@GetMapping(value = "/wishlist/{userId}")
	public ResponseEntity<Map<String, Object>> cart_list(@PathVariable(value = "userId") String userId) throws Exception {
        User user = User.builder()
                    .userId(userId)
                    .build();		
		Map<String, Object> resultMap = new HashMap<>();
		int status = 1;
		String msg = "성공";

		List <WishlistDto> data = wishlistService.wishlistList(user);
		resultMap.put("status", status);
		resultMap.put("msg", msg);
		resultMap.put("data", data);

		return ResponseEntity
				.status(HttpStatus.OK)
				.header(HttpHeaders.CONTENT_TYPE, "application/json;charset=UTF-8")
				.body(resultMap);
	}	
	
	@Operation(summary = "WishList 아이템 한개 삭제")
	@DeleteMapping(value = "/wishlist/{wishlistId}")
	public ResponseEntity<Map<String, Object>> wishlist_delete_wishlistId(@PathVariable("wishlistId") String wishlistId) throws Exception{
		Map<String, Object> resultMap = new HashMap<>();
		int status = 1;
		String msg = "성공";
		Wishlist wishlist = Wishlist.builder()
					.wishlistId(Long.parseLong(wishlistId))
					.build();

		wishlistService.wishlistDeleteWishlistId(wishlist);
		status=1;
		msg="";
		/******************************************
		resultMap.put("status", status);
		resultMap.put("msg", msg);
		resultMap.put("data", wishlistId);
		return ResponseEntity
				.status(HttpStatus.OK)
				.header(HttpHeaders.CONTENT_TYPE, "application/json;charset=UTF-8")
				.body(resultMap);
	}	



	@Operation(summary = "WishList 아이템 전체 삭제")
	@DeleteMapping(value = "/wishlists/{userId}")
	public ResponseEntity<Map<String, Object>> cart_delete_user(@PathVariable("userId") String userId) throws Exception{
        User user = User.builder()
                    .userId(userId)
                    .build();	

		Map<String, Object> resultMap = new HashMap<>();
		int status = 1;
		String msg = "성공";
		/******************************************
		//System.out.println("########### cart_delete_user cartItemId : " + userId);
		wishlistService.wishlistDeleteUser(user);
		status=1;
		msg="";
		/******************************************
		resultMap.put("status", status);
		resultMap.put("msg", msg);
		resultMap.put("data", userId);
		return ResponseEntity
				.status(HttpStatus.OK)
				.header(HttpHeaders.CONTENT_TYPE, "application/json;charset=UTF-8")
				.body(resultMap);
	}
*/
}
