package com.lms.course.dto;

import java.util.Date;

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
public class StudentCourselistDto {

    private Date enrolledDate;
    private Long courseId;
    private Long enrollmentId;
    private Long status;
    private String studentId;

    private String tutorName; 
    private String title;
    private String description;
}

