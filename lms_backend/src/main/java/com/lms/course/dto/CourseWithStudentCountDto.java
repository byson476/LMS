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
public class CourseWithStudentCountDto {

    private Date enrolledDate;
    private Long courseId;
    private Long enrollmentId;
    private Long status;
    private String studentId;
    private String studentName;
    private String studentEmail;

    private String title;
    private String description;
}

