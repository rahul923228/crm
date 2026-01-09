package com.crm.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Map /files/chat/** URLs to C:/crm_uploads/chat/ folder
        registry.addResourceHandler("/files/chat/**")
                .addResourceLocations("file:///C:/crm_uploads/chat/");
    }
}
