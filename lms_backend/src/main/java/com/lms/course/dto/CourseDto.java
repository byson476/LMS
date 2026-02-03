package com.lms.course.dto;

import com.lms.course.entity.Course;
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
	private Tutor tutor;
    public static CourseDto toDto(Course courseEntity) {
        return CourseDto.builder()
                .courseId(courseEntity.getCourseId())
                .title(courseEntity.getTitle())
                .description(courseEntity.getDescription())
                .tutor(courseEntity.getTutor())
                .build();
    }
}
