package com.lms.course.entity;

import java.sql.Date;

import com.lms.course.dto.CourseDto;
import com.lms.course.dto.CourseEnrollmentDto;
import com.lms.user.entity.Student;
import com.lms.user.entity.Tutor;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
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
public class CourseEnrollment {
	@Id
    @Column(name = "enrollmentid")
	@SequenceGenerator(name = "ENROLLMENT_ID_SEQ", sequenceName = "ENROLLMENT_ID_SEQ", initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ENROLLMENT_ID_SEQ")
	private Long enrollmentId;
    private Date enrolledDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "studentid")
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "courseid")
    private Course course;

    public static CourseEnrollment toEntity(CourseEnrollmentDto courseEnrollmentDto) {
        return CourseEnrollment.builder()
                .enrollmentId(courseEnrollmentDto.getEnrollmentId())
                .enrolledDate(courseEnrollmentDto.getEnrolledDate())
                .student(courseEnrollmentDto.getStudent())
                .course(courseEnrollmentDto.getEnrollments().get(0).getCourse())
                .build();
    }
}
