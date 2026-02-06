package com.lms.course.dto;

import java.sql.Date;
import java.util.List;

import com.lms.course.entity.Course;
import com.lms.course.entity.CourseEnrollment;
import com.lms.user.entity.Student;
import com.lms.user.entity.Tutor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDto {
	private Long courseId;
	private String title;
	private String description;
    private String tutorName;
	private Tutor tutor;
    private List<CourseEnrollment> enrollments;
    private Long status;
    private Date enrolledDate;
    private Student student;
    private String studentName;

    public static CourseDto toDto(Course courseEntity) {
        return CourseDto.builder()
                .courseId(courseEntity.getCourseId())
                .title(courseEntity.getTitle())
                .description(courseEntity.getDescription())
                .tutorName(courseEntity.getTutor().getUser().getName())
                .tutor(courseEntity.getTutor())
                .status(courseEntity.getEnrollments().isEmpty() ? null : courseEntity.getEnrollments().get(0).getStatus())
                .enrolledDate(courseEntity.getEnrollments().isEmpty() ? null : courseEntity.getEnrollments().get(0).getEnrolledDate())
                .enrollments(courseEntity.getEnrollments())
                .student(courseEntity.getEnrollments().isEmpty() ? null : courseEntity.getEnrollments().get(0).getStudent())
                .studentName(courseEntity.getEnrollments().isEmpty() ? null : courseEntity.getEnrollments().get(0).getStudent().getUser().getName())
                .build();
    }
}
