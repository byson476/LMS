package com.lms.course.entity;

import java.util.List;

import com.lms.course.dto.CourseDto;
import com.lms.user.entity.Tutor;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Entity
public class Course {
	@Id
    @Column(name = "courseid")
	@SequenceGenerator(name = "COURSE_ID_SEQ", sequenceName = "COURSE_ID_SEQ", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "COURSE_ID_SEQ")
	private Long courseId;
	private String title;
	private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tutorid")
    private Tutor tutor;
/* 
    @OneToMany(mappedBy = "course")
    private List<CourseEnrollment> enrollments;
*/
    @OneToMany(
        mappedBy = "course",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<CourseEnrollment> enrollments;
    
    public static Course toEntity(CourseDto courseDto) {
        return Course.builder()
                .courseId(courseDto.getCourseId())
                .title(courseDto.getTitle())
                .description(courseDto.getDescription())
                .tutor(courseDto.getTutor())
                .build();
    }
}