package com.example.app.swagger.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenAPIConfig {
    @Value("${server.port}")
    private String port;


    @Bean
    public OpenAPI myOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:" + port);
        devServer.setDescription("Server URL in Development environment");

        Info info = new Info()
                .title("Statistics API")
                .description("Esta API tem fins de fazer as operações lógicas necessárias em um contexto estatístico.");

        return new OpenAPI().info(info).servers(List.of(devServer));
    }
}
