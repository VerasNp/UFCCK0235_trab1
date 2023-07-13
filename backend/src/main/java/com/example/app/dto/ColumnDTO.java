package com.example.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class ColumnDTO {
    @NotBlank(message = "Please, inform the column title!")
    private String title;
    @NotEmpty(message = "To perform this action, the column cannot be empty!")
    private List<String> data;
}
