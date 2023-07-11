package com.example.app.services.interfaces;

import com.example.app.dto.StatisticDTO;
import com.example.app.models.Column;

import java.util.List;

public interface IStatisticService {
    StatisticDTO calculate(Column data);
}
