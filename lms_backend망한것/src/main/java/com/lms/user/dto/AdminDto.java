package com.lms.user.dto;

import java.sql.Date;

import com.lms.user.entity.Admin;
import com.lms.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminDto {
	private String adminId;
    private Integer levels;
	private User user;
    public static AdminDto toDto(Admin adminEntity) {
        return AdminDto.builder()
                .adminId(adminEntity.getAdminId())
                .levels(adminEntity.getLevels())
                .user(adminEntity.getUser())
                .build();
    }
}
