package com.example.app.controllers;

import com.example.app.dto.ColumnDTO;
import com.example.app.models.Column;
import com.example.app.services.NonNumericDataStatisticService;
import com.example.app.services.NumericDataStatisticService;
import com.example.app.services.interfaces.IStatisticService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/statistic")
public class StatisticController{

    private final ModelMapper modelMapper;

    public StatisticController() {
        this.modelMapper = new ModelMapper();
    }

    @PostMapping()
    public ResponseEntity<Object> calculateStatisticMeasurements(@Valid @RequestBody ColumnDTO columnDTO) {
        System.out.println(columnDTO);

        Column column = new Column();
        this.modelMapper.map(columnDTO, column);

        IStatisticService statisticServiceDecorator;
        if(column.getNumericData()){
            statisticServiceDecorator = new NumericDataStatisticService();
        } else {
            statisticServiceDecorator = new NonNumericDataStatisticService();
        }

        return ResponseEntity.ok(statisticServiceDecorator.calculate(column));
    }
}
