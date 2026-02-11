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
public class TutorStudentListDto {
    private String studentId;
    private String name;
    private String email;
    private String enrolledDate;
}
