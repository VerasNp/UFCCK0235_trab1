package com.example.app.controllers;

import java.io.IOException;
import java.io.InputStreamReader;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;

import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvValidationException;


@RestController
@RequestMapping("/upload")
public class FileUploadController {

    @PostMapping(value = "/csv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadCSVFile(@RequestParam("file") MultipartFile file) {
        if (!file.isEmpty()) {
            try {
                boolean isCommaSeparated = verifyCSVSeparator(file, ',');
                boolean isSemicolonSeparated = verifyCSVSeparator(file, ';');
           
                if (isCommaSeparated|| isSemicolonSeparated) {
                    return ResponseEntity.ok("Valid CSV file uploaded.");
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid separators");
                }
            } 
            catch (IOException | CsvValidationException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing the file");
            }
        }  
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No file uploaded."); 
    }

    private boolean verifyCSVSeparator(MultipartFile file, char separator) throws IOException, CsvValidationException {
        try(CSVReader csvReader = new CSVReaderBuilder(new InputStreamReader(file.getInputStream()))
            .withCSVParser(new CSVParserBuilder().withSeparator(separator).build())
            .build();){ 

            String[] line;
            int col_count = -1;
            while ((line = csvReader.readNext()) != null){ 
                if (col_count == -1)
                    col_count = line.length; 
                else {
                    if (line.length  != col_count)
                        return false; 
                }   
            }

            return true; 
        }
    }

}
