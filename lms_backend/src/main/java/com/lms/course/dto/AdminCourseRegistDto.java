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
public class AdminCourseRegistDto {
    private String userId;
    private String tutorId;
    private String title;
    private String description;
    private Long maxStudents;
    private String startDate;
}

