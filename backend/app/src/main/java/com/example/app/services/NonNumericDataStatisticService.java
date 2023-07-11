package com.example.app.services;

import com.example.app.dto.NonNumericStatisticDTO;
import com.example.app.dto.StatisticDTO;
import com.example.app.models.Column;
import com.example.app.services.interfaces.IStatisticService;

import java.util.Hashtable;
import java.util.List;

public class NonNumericDataStatisticService implements IStatisticService {

    @Override
    public StatisticDTO<NonNumericStatisticDTO> calculate(Column column) {
        String mode = this.mode(column.getData());

        NonNumericStatisticDTO nonNumericStatisticDTO = new NonNumericStatisticDTO();
        nonNumericStatisticDTO.source = column;
        nonNumericStatisticDTO.mode = mode;
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
}
