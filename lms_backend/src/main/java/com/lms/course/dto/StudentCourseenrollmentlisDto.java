package com.lms.course.dto;

import java.sql.Date;
import java.util.List;

import com.lms.course.entity.Course;
import com.lms.course.entity.CourseEnrollment;
import com.lms.user.entity.Student;
import com.lms.user.entity.Tutor;

import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentCourseenrollmentlisDto {
    private Long courseId;
}
