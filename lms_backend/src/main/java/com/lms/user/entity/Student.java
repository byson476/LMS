package com.lms.user.entity;

import java.sql.Date;

import com.lms.user.dto.StudentDto;

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
public class Student {
	@Id
	@Column(name = "sutdentid")
	private String sutdentId;
    private Integer grade;
    private Date enrolledDate;

	@ManyToOne (fetch = FetchType.LAZY)
	@JoinColumn(name = "userid")
	private User user;

    public static Student toEntity(StudentDto studentDto) {
        return Student.builder()
                .sutdentId(studentDto.getSutdentId())
                .grade(studentDto.getGrade())
                .enrolledDate(studentDto.getEnrolledDate())
                .user(studentDto.getUser())
                .build();
    }
}
