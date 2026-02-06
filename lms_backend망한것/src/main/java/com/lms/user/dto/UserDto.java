package com.lms.user.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lms.user.entity.User;
import com.lms.user.entity.UserRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Builder.Default;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private String userId;
    private String password;
    private String name;
    private String email;
    private boolean social;
    @Default
    private List<UserRole> roles = new ArrayList<>();

    public static UserDto toDto(User userEntity) {

        return UserDto.builder()
                .userId(userEntity.getUserId())
                .password(userEntity.getPassword())
                .name(userEntity.getName())
                .email(userEntity.getEmail())
                .social(userEntity.isSocial())
                .roles(userEntity.getRoles())
                .build();
    }

    @JsonIgnore
    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("userId", userId);
        dataMap.put("password", password);
        dataMap.put("name", name);
        dataMap.put("email", email);
        dataMap.put("social", social);
        dataMap.put("roleNames", roles);
        return dataMap;
    }
}
