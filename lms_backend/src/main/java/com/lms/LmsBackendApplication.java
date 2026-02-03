package com.lms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.lms.course.entity.Course;
import com.lms.course.entity.CourseEnrollment;
import com.lms.course.repository.CourseEnrollmentRepository;
import com.lms.course.repository.CourseRepository;
import com.lms.user.entity.Admin;
import com.lms.user.entity.Student;
import com.lms.user.entity.Tutor;
import com.lms.user.entity.User;
import com.lms.user.entity.UserRole;
import com.lms.user.repository.AdminRepository;
import com.lms.user.repository.StudentRepository;
import com.lms.user.repository.TutorRepository;
import com.lms.user.repository.UserRepository;

@SpringBootApplication
public class LmsBackendApplication  implements CommandLineRunner {
	@Autowired
	UserRepository userRepository;
	@Autowired
	StudentRepository studentRepository;
	@Autowired
	TutorRepository tutorRepository;
	@Autowired
	AdminRepository adminRepository;
	@Autowired
	CourseRepository courseRepository;
	@Autowired
	CourseEnrollmentRepository courseEnrollmentRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(LmsBackendApplication.class, args);
		
	}

		@Override
	public void run(String... args) throws Exception {
		User user1 = User.builder()
				.userId("guard1")
				.name("김경호1")
				.email("guard1@gmail.com")
				.password(passwordEncoder.encode("1111")).social(false)
				.build();
		user1.addRole(UserRole.STUDENT);

		User user2 = User.builder()
				.userId("guard2")
				.name("김경호2")
				.email("guard2@gmail.com")
				.password(passwordEncoder.encode("2222")).social(false)
				.build();
		user2.addRole(UserRole.TUTOR);
		User user3 = User.builder()
				.userId("guard3")
				.name("김경호3")
				.email("guard3@gmail.com")
				.password(passwordEncoder.encode("3333")).social(false)
				.build();
		user3.addRole(UserRole.STUDENT);
		user3.addRole(UserRole.TUTOR);

		User user4 = User.builder()
				.userId("guard4")
				.name("김경호4")
				.email("guard4@gmail.com")
				.password(passwordEncoder.encode("4444")).social(false)
				.build();
		user4.addRole(UserRole.ADMIN);
		
		userRepository.save(user1);
		userRepository.save(user2);
		userRepository.save(user3);
		userRepository.save(user4);

		Student student1 = Student.builder()
				.studentId(user1.getUserId())
				.grade(1)
				.creatDate(java.sql.Date.valueOf("2023-03-01"))
				.user(user1)
				.build();
		studentRepository.save(student1);
 
		Tutor tutor1 = Tutor.builder()
				.tutorId(user2.getUserId())
				.major("JAVA")
				.hiredDate(java.sql.Date.valueOf("2022-05-15"))
				.user(user2)
				.build();
		tutorRepository.save(tutor1);

		Admin admin1 = Admin.builder()
				.adminId(user4.getUserId())
				.levels(1)
				.user(user4)
				.build();
		adminRepository.save(admin1);

		Course course1 = Course.builder()
				.title("Java Basics")
				.description("Introduction to Java programming")
				.tutor(tutor1)
				.build();
		Course course2 = Course.builder()
				.title("Advanced Java")
				.description("Deep dive into Java programming")
				.tutor(tutor1)
				.build();
		Course course3 = Course.builder()
				.title("Spring Framework")
				.description("Comprehensive guide to Spring Framework")
				.tutor(tutor1)
				.build();
		Course course4 = Course.builder()
				.title("Hibernate ORM")
				.description("Learn Hibernate for database management")
				.tutor(tutor1)
				.build();
		Course course5 = Course.builder()
				.title("Microservices with Spring Boot")
				.description("Building microservices using Spring Boot")
				.tutor(tutor1)
				.build();
		Course course6 = Course.builder()
				.title("RESTful APIs")
				.description("Designing and building RESTful APIs")
				.tutor(tutor1)
				.build();
		courseRepository.save(course1);
		courseRepository.save(course2);
		courseRepository.save(course3);
		courseRepository.save(course4);
		courseRepository.save(course5);
		courseRepository.save(course6);

		CourseEnrollment courseEnrollment1 = CourseEnrollment.builder()
				.enrolledDate(java.sql.Date.valueOf("2023-09-01"))
				.status(1L)
				.student(student1)
				.course(course1)
				.build();
		CourseEnrollment courseEnrollment2 = CourseEnrollment.builder()
				.enrolledDate(java.sql.Date.valueOf("2023-09-10"))
				.status(1L)
				.student(student1)
				.course(course2)
				.build();
		courseEnrollmentRepository.save(courseEnrollment1);
		courseEnrollmentRepository.save(courseEnrollment2);
	}
}
