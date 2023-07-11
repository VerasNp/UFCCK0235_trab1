package com.example.app.services;

import com.example.app.dto.StatisticDTO;
import com.example.app.models.Column;
import com.example.app.services.interfaces.IStatisticService;

public class StatisticServiceDecorator implements IStatisticService {

    private final IStatisticService wrapper;

    public StatisticServiceDecorator(IStatisticService statisticService) {
        this.wrapper = statisticService;
    }

    @Override
    public StatisticDTO calculate(Column column) {
        return wrapper.calculate(column);
    }
}
