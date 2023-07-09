package com.example.app.controllers;

import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;

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


@RestController
@RequestMapping("/upload")
public class FileUploadController {

    @PostMapping(value = "/csv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = "application/json")
    public ResponseEntity<Vector<String[]>> uploadCSVFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        if (!isValidExtension(file.getContentType())){ 
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        try {
            String csvContent = removeHtmlTags(file);
            CSVReader csvReader = getCSVReader(csvContent); 

            List<String[]> tableString = alignColumns(csvReader); 
            int columnSize = columnSize(tableString); 
            Vector<String[]> columns = generateColumns(tableString,columnSize);
            //TODO: columns será utilizada para transformar em objeto coluna e logo appós em objeto tabela
            return ResponseEntity.ok().body(columns);
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

    private int columnSize(List<String[]> tableString){ 
        return tableString.get(0).length;
    }

    private Vector<String[]> generateColumns(List<String[]> tableString, int columnNumber){  
        Vector<String> vectorColumns = new Vector<String>(); 
        boolean isFirstLine  = true ;
        for (String[]line : tableString){ 
            if (isFirstLine){ 
                String[] tableLine = tableString.get(0);
                processColumns(vectorColumns, tableLine, columnNumber, isFirstLine);
                isFirstLine = false;
            }
            else{
                processColumns(vectorColumns, line, columnNumber, isFirstLine);
            }
        }

        Vector<String[]> columns = new Vector<String[]>(); 
        for (String column : vectorColumns){ 
            String[]splitedColumn = column.split(",");
            columns.add(splitedColumn); 
        }
        return columns; 
    }

    private void processColumns(Vector<String> vectorColumns,String[] line,int columnNumber, boolean isFirstLine){ 
        for (int i = 0; i < columnNumber; i++ ){
            addCell(vectorColumns,line[i],i,isFirstLine);
         }
    }

    private void addCell(Vector<String> vectorColumns, String cell, int vectorIndex, boolean isFirstLine){ 
        if (isFirstLine)
            vectorColumns.add(cell);
        else
            vectorColumns.set(vectorIndex, vectorColumns.get(vectorIndex) + "," + cell); 
    }

}