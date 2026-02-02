package com.lms.user.entity;

import java.sql.Date;

import com.lms.user.dto.TutorDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@ToString
@Entity
public class Tutor {
	@Id
	@Column(name = "tutorid")
	private String tutorId;
    private String major;
    private Date hiredDate;

	@ManyToOne (fetch = FetchType.LAZY)
	@JoinColumn(name = "userid")
	private User user;

    public static Tutor toEntity(TutorDto tutorDto) {
        return Tutor.builder()
                .tutorId(tutorDto.getTutorId())
                .major(tutorDto.getMajor())
                .hiredDate(tutorDto.getHiredDate())
                .user(tutorDto.getUser())
                .build();
    }
}
