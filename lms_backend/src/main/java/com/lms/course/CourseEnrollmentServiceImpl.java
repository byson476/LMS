package com.lms.course;

import java.util.ArrayList;
import java.util.List;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lms.course.dto.CourseDto;
import com.lms.course.entity.Course;
import com.lms.course.entity.CourseEnrollment;
import com.lms.course.repository.CourseEnrollmentRepository;
import com.lms.course.repository.CourseRepository;
import com.lms.user.entity.Student;
import com.lms.user.repository.StudentRepository;
import com.lms.user.repository.UserRepository;

import lombok.Builder;


import jakarta.transaction.Transactional;

@Builder
@Service
public class CourseEnrollmentServiceImpl implements CourseEnrollmentService{
    @Autowired
    private CourseEnrollmentRepository courseEnrollmentRepository;
    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private StudentRepository studentRepository;


@Override
@Transactional
public List<CourseDto> courseList(Student student) {
	Student studentEntity = studentRepository.findById(student.getStudentId())
		.orElseThrow(() -> new RuntimeException("학생 없음"));
    List<Course> courses =
            courseEnrollmentRepository.findCoursesByStudent(studentEntity.getStudentId());

    return courses.stream()
        .map(course -> CourseDto.builder()
            .courseId(course.getCourseId())
            .title(course.getTitle())
            .description(course.getDescription())
            .build()
        )
        .toList();
}


/* 
    @Override
    @Transactional
    public Long wishlistWrite(WishlistDto wishlistDto) throws Exception {
        wishlistDto.setWishlistId(null); // 신규 생성이므로 ID를 null로 설정
        Wishlist wishlistEntity = Wishlist.toEntity(wishlistDto);

        System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!wishlistDto.getWishlistId    :::: " + wishlistDto.getWishlistId() + " :: " + wishlistDto.getProduct());
        Wishlist saved = wishlistRepository.save(wishlistEntity);
        return saved.getWishlistId();
   
    }
    

    @Override
    @Transactional
    public List <WishlistDto> wishlistList(User user) throws Exception {

      List <Wishlist> wishlistEntitys= wishlistRepository.findByUser(user);
      List <WishlistDto> wishlistDtoList = new  ArrayList<WishlistDto>();
      for (Wishlist wishlist : wishlistEntitys) {
        wishlistDtoList.add(WishlistDto.toDto(wishlist));
      }
      //CartDtoMulti cartDtoMulti = CartDtoMulti.toDtoMulti(carts);
      return wishlistDtoList;
    }




    @Override
    @Transactional
    public int wishlistDeleteWishlistId(Wishlist wishlist) throws Exception {
        try {

            Wishlist wishlistFromDb = wishlistRepository.findById(wishlist.getWishlistId())
                                .orElseThrow(() -> new Exception("Wishlist item not found"));

            wishlistRepository.delete(wishlistFromDb);
          
            return 1; // 성공
        } catch (Exception e) {
            e.printStackTrace();
            return 0; // 실패
        }
    }
 
    @Override
    @Transactional
    public int wishlistDeleteUser(User user) throws Exception {
        try {
            wishlistRepository.deleteByUser(user);
            return 1; // 성공
        } catch (Exception e) {
            e.printStackTrace();
            return 0; // 실패
        }
    }
*/   
}
