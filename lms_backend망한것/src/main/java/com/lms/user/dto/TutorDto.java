package com.lms.user.dto;

import java.sql.Date;

import com.lms.user.entity.Tutor;
import com.lms.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TutorDto {
	private String tutorId;
    private String major;
    private Date hiredDate;
	private User user;
    public static TutorDto toDto(Tutor tutorEntity) {
        return TutorDto.builder()
                .tutorId(tutorEntity.getTutorId())
                .major(tutorEntity.getMajor())
                .hiredDate(tutorEntity.getHiredDate())
                .user(tutorEntity.getUser())
                .build();
    }
}
