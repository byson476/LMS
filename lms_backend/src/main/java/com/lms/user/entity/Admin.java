package com.lms.user.entity;

import java.sql.Date;

import com.lms.user.dto.AdminDto;
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

@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Entity
public class Admin {
	@Id
	@Column(name = "adminid")
	private String adminId;
    private Integer levels;

	@ManyToOne (fetch = FetchType.LAZY)
	@JoinColumn(name = "userid")
	private User user;

    public static Admin toEntity(AdminDto adminDto) {
        return Admin.builder()
                .adminId(adminDto.getAdminId())
                .levels(adminDto.getLevels())
                .user(adminDto.getUser())
                .build();
    }
}
