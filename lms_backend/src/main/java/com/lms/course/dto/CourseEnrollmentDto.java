package com.lms.course.dto;

import java.sql.Date;
import java.util.List;

import com.lms.course.entity.Course;
import com.lms.course.entity.CourseEnrollment;
import com.lms.user.entity.Student;
import com.lms.user.entity.Tutor;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseEnrollmentDto {
	private Long enrollmentId;
    private Date enrolledDate;
    private Long status;
    private Student student;
    private List<CourseEnrollment> enrollments;

    public static CourseEnrollmentDto toDto(CourseEnrollment CourseEnrollmentEntity) {
        return CourseEnrollmentDto.builder()
                .enrollmentId(CourseEnrollmentEntity.getEnrollmentId())
                .enrolledDate(CourseEnrollmentEntity.getEnrolledDate())
                .status(CourseEnrollmentEntity.getStatus())
                .student(CourseEnrollmentEntity.getStudent())
                .enrollments(CourseEnrollmentEntity.getCourse().getEnrollments())
                .build();
    }
}
