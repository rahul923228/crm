package com.crm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // roll based login
        // http
        //     .csrf(csrf -> csrf.disable())
        //     .authorizeHttpRequests(auth -> auth
        //         .requestMatchers(
        //             "/api/register",
        //             "/api/login"
        //         ).permitAll()
        //         .anyRequest().authenticated()
        //     );


        http
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
            .anyRequest().permitAll()   // 🔓 sab allow
        );
        return http.build();
    }
}
