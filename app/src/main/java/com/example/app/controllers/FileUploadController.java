package com.example.app.controllers;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

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
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvValidationException;

import ch.qos.logback.core.rolling.TriggeringPolicy;


@RestController
@RequestMapping("/upload")
public class FileUploadController {

    @PostMapping(value = "/csv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = "application/json")
    public ResponseEntity<List<String[]>> uploadCSVFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        if (!isValidExtension(file.getContentType())){ 
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        try {
            String csvContent = removeHtmlTags(file);
            StringReader reader =  new StringReader(new String(file.getBytes()));
            //Ou
            CSVReader csvReader = getCSVReader(csvContent); 
            List<String[]> tableString = alignColumns(csvReader); 
            //TODO: colocar a tableString em um objeto que será retornado
            return ResponseEntity.ok().body(tableString);
        } 
        catch (IOException | CsvValidationException  e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); 
        }
    
    }

    private boolean isValidExtension(String contentType){ 
        return contentType != null && (contentType.equals("text/csv"));
    }
    
    public String removeHtmlTags(MultipartFile file) throws IOException, CsvValidationException {
        CSVReader csvReader = getCSVReader(new String(file.getBytes()));

        StringWriter writer = new StringWriter();
        CSVWriter csvWriter = new CSVWriter(writer);

        String[] nextLine;
        while ((nextLine = csvReader.readNext()) != null) {
            String[] cleanedLine = new String[nextLine.length];
            for (int i = 0; i < nextLine.length; i++) {
                cleanedLine[i] = removeHtmlTagsFromValue(nextLine[i]);
            }
            csvWriter.writeNext(cleanedLine);
        }

        csvReader.close();
        csvWriter.close();

        String csvContent = writer.toString();

        return csvContent;
    }

    private String removeHtmlTagsFromValue(String value) {
        String cleanedValue = value.replaceAll("<[^>]+>", "");
        return cleanedValue;
    }


    private CSVReader getCSVReader(String csvContent) throws IOException, CsvValidationException{ 
        CSVReader csvReader = new CSVReaderBuilder(new StringReader(csvContent))
                .withCSVParser(new CSVParserBuilder().withSeparator(',').build())
                .build();
        return csvReader;
    }

    private List<String[]> alignColumns(CSVReader csvReader) throws IOException, CsvValidationException{ 

            String[] line;
            int biggestLine = -1;
            List<String[]> lines = new ArrayList<String[]>();

            while ((line = csvReader.readNext()) != null){ 
                if (line.length > biggestLine)
                    biggestLine = line.length;

                lines.add(line);
            }

            List<String[]> alignedlines = new ArrayList<>();
             for (String[] currline : lines){ 
                alignedlines.add(copyAndAlignColumns(currline,biggestLine));
            }
            return alignedlines; 
    }

    private String[] copyAndAlignColumns(String[] originalLine, int size){ 
        String[] lineDestination = new String[size]; 
        for (int i = 0; i < size; i++){ 
            if (i < originalLine.length){  
                lineDestination[i] = originalLine[i]; 
            }else { 
                lineDestination[i] = " "; 
            }
        }
        return lineDestination; 
    }
}