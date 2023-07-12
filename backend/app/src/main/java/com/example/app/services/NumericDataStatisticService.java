package com.example.app.services;

import com.example.app.dto.NumericStatisticDTO;
import com.example.app.dto.StatisticDTO;
import com.example.app.models.Column;
import com.example.app.services.interfaces.IStatisticService;

import java.util.*;

import static java.lang.Math.ceil;

public class NumericDataStatisticService implements IStatisticService {

    @Override
    public StatisticDTO<NumericStatisticDTO> calculate(Column column) {
        List<Double> numericData = column.getData().stream()
                .map(Double::parseDouble).toList();
        StatisticDTO<NumericStatisticDTO> numericStatisticDTO = new StatisticDTO<>();
        numericStatisticDTO.source = column;
        numericStatisticDTO.analysisCalcs = new NumericStatisticDTO();
        numericStatisticDTO.analysisCalcs.mean = this.mean(numericData);
        numericStatisticDTO.analysisCalcs.mode = this.mode(column.getData());
        numericStatisticDTO.analysisCalcs.median = this.median(numericData);
        numericStatisticDTO.analysisCalcs.firstQuartile = this.firstQuartile(numericData);
        numericStatisticDTO.analysisCalcs.thirdQuartile = this.thirdQuartile(numericData);
        numericStatisticDTO.analysisCalcs.varianceSum = this.varianceSum(numericData);
        numericStatisticDTO.analysisCalcs.sampleVariance = this.sampleVariance(numericData);
        numericStatisticDTO.analysisCalcs.populationVariance = this.populationVariance(numericData);
        numericStatisticDTO.analysisCalcs.sampleStandardDeviation = this.sampleStandardDeviation(numericData);
        numericStatisticDTO.analysisCalcs.populationStandardDeviation = this.populationStandardDeviation(numericData);
        numericStatisticDTO.analysisCalcs.coefficientVariation = this.coefficientVariation(numericData);
        numericStatisticDTO.analysisCalcs.maximum = this.maximum(numericData);
        numericStatisticDTO.analysisCalcs.minimum = this.minimum(numericData);
        numericStatisticDTO.analysisCalcs.amplitude = this.amplitude(numericData);
        numericStatisticDTO.analysisCalcs.frequency = this.frequency(numericData);

        return numericStatisticDTO;
    }

    /**
     *
     * @param data
     * @return
     */
    protected Double mode(List<String> data) {
        Hashtable<String, Integer> auxMode = new Hashtable<>();
        int maxFreq = 1;
        String modeElement = data.get(0);
        List<String> sortedData = new ArrayList<>(data);
        sortedData.sort(Comparator.naturalOrder());

        for (var dat :
                sortedData) {
            if (auxMode.containsKey(dat)) {
                if (auxMode.get(dat) + 1 > maxFreq) {
                    auxMode.put(dat, auxMode.get(dat) + 1);
                    maxFreq = auxMode.get(dat);
                    modeElement = dat;
                } else {
                    auxMode.put(dat, auxMode.get(dat) + 1);
                }
            } else {
                auxMode.put(dat, 1);
            }
        }

        return Double.valueOf(modeElement);
    }

    /**
     * @param data
     * @return
     */
    protected Double mean(List<Double> data) {
        var sum = data.stream().mapToDouble(Double::doubleValue).sum();
        return sum / data.size();
    }

    /**
     * @return
     */
    protected Double median(List<Double> data) {
        double posM = ((double) data.size() / 2) - 1;
        List<Double> sortedData = new ArrayList<>(data);
        sortedData.sort(Comparator.naturalOrder());
        double median;
        if (posM != (int) posM) {
            median = Double.parseDouble(String.valueOf(sortedData.get((int) (posM + 1))));

        } else {
            median = (Double.parseDouble(String.valueOf(sortedData.get((int) posM))) + Double.parseDouble(String.valueOf(sortedData.get((int) posM + 1)))) / 2;
        }

        return median;
    }

    protected Double firstQuartile(List<Double> data) {
        double firstQuartile = 0.0;
        List<Double> sortedData = new ArrayList<>(data);
        sortedData.sort(Comparator.naturalOrder());
        if (sortedData.size() > 4) {
            double pos = ((double) sortedData.size() / 4);
            if (pos != (int) pos) {
                firstQuartile = Double.parseDouble(String.valueOf(sortedData.get((int) ceil(pos) - 1)));
            } else {
                firstQuartile = (Double.parseDouble(String.valueOf(sortedData.get((int) pos - 1))) + Double.parseDouble(String.valueOf(sortedData.get((int) pos)))) / 2;
            }
        }
        return firstQuartile;
    }

    protected Double thirdQuartile(List<Double> data) {
        double thirdQuartile = 0.0;
        List<Double> sortedData = new ArrayList<>(data);
        sortedData.sort(Comparator.naturalOrder());
        if (sortedData.size() > 4) {
            double pos = ((double) (3 * sortedData.size()) / 4);
            if (pos != (int) pos) {
                thirdQuartile = Double.parseDouble(String.valueOf(sortedData.get((int) ceil(pos) - 1)));
            } else {
                thirdQuartile = (Double.parseDouble(String.valueOf(sortedData.get((int) pos - 1))) + Double.parseDouble(String.valueOf(sortedData.get((int) pos)))) / 2;
            }
        }
        return thirdQuartile;
    }

    protected Double varianceSum(List<Double> data) {
        double varianceSum = 0.0;
        double mean = this.mean(data);
        List<Double> sortedData = new ArrayList<>(data);
        sortedData.sort(Comparator.naturalOrder());
        for (var dat :
                sortedData) {
            varianceSum += Math.pow(dat - mean, 2);
        }

        return varianceSum;
    }

    protected Double sampleVariance(List<Double> data) {
        return this.varianceSum(data) / (data.size() - 1);
    }

    protected Double populationVariance(List<Double> data) {
        return this.varianceSum(data) / data.size();
    }

    protected Double sampleStandardDeviation(List<Double> data) {
        return Math.sqrt(this.sampleVariance(data));
    }

    protected Double populationStandardDeviation(List<Double> data) {
        return Math.sqrt(this.populationVariance(data));
    }

    /**
     * Measure of dispersion
     *
     * @return
     */
    protected Double coefficientVariation(List<Double> data) {
        return (this.populationStandardDeviation(data) * 100) / this.mean(data);
    }

    protected Double maximum(List<Double> data) {
        return data
                .stream()
                .mapToDouble(v -> v)
                .max()
                .orElseThrow(NoSuchElementException::new);
    }

    protected Double minimum(List<Double> data) {
        return data
                .stream()
                .mapToDouble(v -> v)
                .min()
                .orElseThrow(NoSuchElementException::new);
    }

    protected Double amplitude(List<Double> data) {
        return this.maximum(data) - this.minimum(data);
    }

    protected Map<Double, Double> frequency(List<Double> data) {
        Map<Double, Double> frequency = new HashMap<>();
        for (var dat:
                data) {
            double aux = frequency.getOrDefault(dat, 0.0);
            frequency.put(dat, aux + 1);
        }

        for (var key:
                frequency.keySet()) {
            double aux = frequency.getOrDefault(key, 0.0);
            frequency.put(key, (aux * 100) / data.size());
        }

        return frequency;
    }
}
