package com.example.app.services;

import com.example.app.dto.NonNumericStatisticDTO;
import com.example.app.dto.StatisticDTO;
import com.example.app.models.Column;
import com.example.app.services.interfaces.IStatisticService;

import java.util.*;

public class NonNumericDataStatisticService implements IStatisticService {

    @Override
    public StatisticDTO<NonNumericStatisticDTO> calculate(Column column) {

        StatisticDTO<NonNumericStatisticDTO> nonNumericStatisticDTO = new StatisticDTO<NonNumericStatisticDTO>();
        nonNumericStatisticDTO.source = column;
        nonNumericStatisticDTO.analysisCalcs = new NonNumericStatisticDTO();
        nonNumericStatisticDTO.analysisCalcs.mode = this.mode(column.getData());
        nonNumericStatisticDTO.analysisCalcs.frequency = this.frequency(column.getData());;
        return nonNumericStatisticDTO;
    }

    protected String mode(List<String> data) {
        Hashtable<String, Integer> auxMode = new Hashtable<String, Integer>();
        int maxFreq = 1;
        String modeElement = data.get(0);
        for (var dat :
                data) {
            if (auxMode.containsKey(dat)) {
                if (auxMode.get(dat) + 1 > maxFreq) {
                    modeElement = dat;
                } else {
                    auxMode.put(dat, auxMode.get(dat) + 1);
                }
            } else {
                auxMode.put(dat, 1);
            }
        }

        return modeElement;
    }

    protected Map<String, Double> frequency(List<String> data) {
        Map<String, Double> frequency = new HashMap<>();
        for (var dat:
             data) {
            String lowerCase = String.format(dat).replace("\"", "").toLowerCase();
            double aux = frequency.getOrDefault(lowerCase.trim(), 0.0);
            frequency.put(lowerCase.trim(), aux + 1);
        }

        for (String key:
                frequency.keySet()) {
            double aux = frequency.getOrDefault(key, 0.0);
            frequency.put(key, (aux * 100) / data.size());
        }

        return frequency;
    }
}
