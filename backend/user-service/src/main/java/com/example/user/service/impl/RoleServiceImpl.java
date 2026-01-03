package com.example.user.service.impl;

import com.example.user.repository.RoleRepository;
import com.example.user.domain.entities.Role;
import com.example.user.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleRepository roleRepository;

    @Override
    public Role getDefaultRole() {
        return roleRepository.findByName("USER").orElseThrow(() -> new IllegalStateException("Default role not found"));
    }
}
