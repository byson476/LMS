package com.lms.user.repository;

import java.util.List;

import com.lms.course.dto.StudentCourselistDto;
import com.lms.course.dto.TutorStudentListDto;
import com.lms.course.dto.CourseWithStudentCountDto;
import com.lms.course.entity.Course;
import com.lms.course.entity.CourseEnrollment;
import com.lms.user.dto.AdminStudentlistDto;
import com.lms.user.dto.AdminTutorSelectListDto;

public interface StudentRepositoryCustom {
    List<AdminStudentlistDto> findAdminStudentlist();
}
