package com.example.app.services;

import com.example.app.services.interfaces.IStatisticService;

import java.util.List;

public class StatisticServiceDecorator implements IStatisticService {

    private IStatisticService wrapper;

    public StatisticServiceDecorator(IStatisticService statisticService) {
        this.wrapper = statisticService;
    }

    @Override
    public void calculate(List<String> data) {
        wrapper.calculate(data);
    }
}
