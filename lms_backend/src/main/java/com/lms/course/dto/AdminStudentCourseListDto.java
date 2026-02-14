package com.lms.course.dto;

import java.sql.Date;

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
public class AdminStudentCourseListDto{
    private Long courseId;
    private Date enrolledDate;
    private String title;
    private String description;
    private String tutorName;
}