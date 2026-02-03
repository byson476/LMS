package com.lms.course;

import java.util.List;

import com.lms.course.dto.CourseDto;
import com.lms.user.entity.Student;

import jakarta.transaction.Transactional;

@Transactional
public interface CourseEnrollmentService  {
    /*
	 * cartDtoSingle 저장/수정
	 */	
    //Long wishlistWrite(WishlistDto wishlistDto) throws Exception;
	

	// Student로 course가져옴
    public List <CourseDto> courseList(Student student) throws Exception;

    /*
	 * cartItemId로삭제
	 */ 
	//int wishlistDeleteWishlistId(Wishlist wishlist) throws Exception;
    /*
	 * userId로삭제
	 */
	//int wishlistDeleteUser(User user) throws Exception;   
	 
}
