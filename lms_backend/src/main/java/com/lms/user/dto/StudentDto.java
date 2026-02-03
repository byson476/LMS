package com.lms.user.dto;

import java.sql.Date;

import com.lms.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentDto {
	private String sutdentId;
    private Integer grade;
    private Date creatDate;
	private User user;
    public static StudentDto toDto(com.lms.user.entity.Student studentEntity) {
        return StudentDto.builder()
                .sutdentId(studentEntity.getSutdentId())
                .grade(studentEntity.getGrade())
                .creatDate(studentEntity.getCreatDate())
                .user(studentEntity.getUser())
                .build();
    }
}
