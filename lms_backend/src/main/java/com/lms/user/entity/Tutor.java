package com.lms.user.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import com.lms.course.entity.Course;
import com.lms.user.dto.TutorDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    @OneToMany(mappedBy = "tutor")
    private final List<Course> courses = new ArrayList<>();
    
    public static Tutor toEntity(TutorDto tutorDto) {
        return Tutor.builder()
                .tutorId(tutorDto.getTutorId())
                .major(tutorDto.getMajor())
                .hiredDate(tutorDto.getHiredDate())
                .user(tutorDto.getUser())
                .build();
    }
}
