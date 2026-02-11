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
public class StudentListForCourseTutorDto {
    private String tutorId;
    private Date enrolledDate;
    private String studentId;
    private String studentName; 
    private String studentEmail;
}
