package com.lms.user.entity;

import java.sql.Date;
import java.util.List;

import com.lms.course.entity.CourseEnrollment;
import com.lms.user.dto.StudentDto;

import jakarta.persistence.CascadeType;
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
public class Student {
	@Id
	@Column(name = "studentid")
	private String studentId;
    private Integer grade;
    private Date creatDate;

	@ManyToOne (fetch = FetchType.LAZY)
	@JoinColumn(name = "userid")
	private User user;

 @OneToMany(mappedBy = "student",
           cascade = CascadeType.ALL,
           orphanRemoval = true)
    private List<CourseEnrollment> enrollments;

    public static Student toEntity(StudentDto studentDto) {
        return Student.builder()
                .studentId(studentDto.getStudentId())
                .grade(studentDto.getGrade())
                .creatDate(studentDto.getCreatDate())
                .user(studentDto.getUser())
                .build();
    }
}
