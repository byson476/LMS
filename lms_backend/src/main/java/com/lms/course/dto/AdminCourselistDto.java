package com.lms.course.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AdminCourselistDto {
    private Long courseId;
    private String tutorName;
    private String title;
    private String description;
    private Long studentCount;
}

