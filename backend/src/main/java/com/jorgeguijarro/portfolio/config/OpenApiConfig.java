package com.jorgeguijarro.portfolio.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    OpenAPI portfolioOpenApi() {
        return new OpenAPI().info(new Info()
                .title("Portfolio API")
                .version("v1")
                .description("API del portfolio personal. Incluye comprobación de estado y envío de mensajes de contacto."));
    }
}
