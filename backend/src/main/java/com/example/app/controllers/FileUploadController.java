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

import com.example.app.dto.Coluna;
import com.example.app.dto.Tabela;
import com.opencsv.CSVParserBuilder;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvValidationException;


@RestController
@RequestMapping("/api/upload")
public class FileUploadController {

    @PostMapping(value = "/csv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = "application/json")
    public ResponseEntity<Tabela> uploadCSVFile(@RequestParam("file") MultipartFile file) {
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
            Vector<Coluna> columns = generateColumns(tableString,columnSize);
            Tabela tabela = new Tabela(columns);
            return ResponseEntity.ok().body(tabela);
        }
        catch (IOException | CsvValidationException  e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    /**
     * Valida o tipo de arquivo enviado
     * @param contentType
     * @return
     */
    private boolean isValidExtension(String contentType){
        return contentType != null && (contentType.equals("text/csv"));
    }

    /**
     * Limpa o arquivo de caracteres especiais
     * @param file
     * @return
     * @throws IOException
     * @throws CsvValidationException
     */
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

    /**
     * Tira caracteres especiais d valores
     * @param value
     * @return
     */
    private String removeHtmlTagsFromValue(String value) {
        String cleanedValue = value.replaceAll("<[^>]+>", "");
        return cleanedValue;
    }


    /**
     * Leitor CSV
     * @param csvContent
     * @return
     * @throws IOException
     * @throws CsvValidationException
     */
    private CSVReader getCSVReader(String csvContent) throws IOException, CsvValidationException{
        CSVReader csvReader = new CSVReaderBuilder(new StringReader(csvContent))
                .withCSVParser(new CSVParserBuilder().withSeparator(',').build())
                .build();
        return csvReader;
    }

    /**
     * Alinhamento de colunas
     * @param csvReader
     * @return
     * @throws IOException
     * @throws CsvValidationException
     */
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

    /**
     * Copia e alinha colunas
     * @param originalLine
     * @param size
     * @return
     */
    private String[] copyAndAlignColumns(String[] originalLine, int size){
        String[] lineDestination = new String[size];
        for (int i = 0; i < size; i++){
            if (i < originalLine.length){
                lineDestination[i] = originalLine[i];
            }else {
                lineDestination[i] = "";
            }
        }
        return lineDestination;
    }

    /**
     * Tamanho de coluna
     * @param tableString
     * @return
     */
    private int columnSize(List<String[]> tableString){
        return tableString.get(0).length;
    }

    /**
     * Geração de colunas
     * @param tableString
     * @param columnNumber
     * @return
     */
    private Vector<Coluna> generateColumns(List<String[]> tableString, int columnNumber){
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

        Vector<Coluna> columns = new Vector<Coluna>();
        for (String column : vectorColumns){
            String[]splitedColumn = column.split(",");
            if (splitedColumn.length > 0)
                columns.add(new Coluna(splitedColumn[0],sliceArrayString(splitedColumn,1,splitedColumn.length)));
        }
        return columns;
    }

    /**
     * Partição de array
     * @param arrayStirng
     * @param begin
     * @param end
     * @return
     */
    private Vector<String> sliceArrayString(String[] arrayStirng, int begin, int end) {
        Vector<String> slicedArray = new Vector<>();
        for (int i = begin; i < end; i++){
            slicedArray.add(arrayStirng[i]);
        }
        return slicedArray;
    }

    /**
     * Processamento de colunas
     * @param vectorColumns
     * @param line
     * @param columnNumber
     * @param isFirstLine
     */
    private void processColumns(Vector<String> vectorColumns,String[] line,int columnNumber, boolean isFirstLine){
        for (int i = 0; i < columnNumber; i++ ){
            addCell(vectorColumns,line[i],i,isFirstLine);
        }
    }

    /**
     * Adiciona célula
     * @param vectorColumns
     * @param cell
     * @param vectorIndex
     * @param isFirstLine
     */
    private void addCell(Vector<String> vectorColumns, String cell, int vectorIndex, boolean isFirstLine){
        if (isFirstLine)
            vectorColumns.add(cell);
        else
            vectorColumns.set(vectorIndex, vectorColumns.get(vectorIndex) + "," + cell);
    }

}