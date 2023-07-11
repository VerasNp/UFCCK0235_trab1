package com.example.app.services;

import com.example.app.dto.NumericStatisticDTO;
import com.example.app.dto.StatisticDTO;
import com.example.app.models.Column;
import com.example.app.services.interfaces.IStatisticService;

import java.util.Hashtable;
import java.util.List;
import java.util.NoSuchElementException;

public class NumericDataStatisticService implements IStatisticService {

    @Override
    public StatisticDTO<NumericStatisticDTO> calculate(Column column) {
        List<Double> numericData = column.getData().stream()
                .map(Double::parseDouble).toList();
        NumericStatisticDTO numericStatisticDTO = new NumericStatisticDTO();
        numericStatisticDTO.source = column;
        numericStatisticDTO.mean = this.mean(numericData);
        numericStatisticDTO.mode = this.mode(numericData);
        numericStatisticDTO.median = this.median(numericData);
        numericStatisticDTO.firstQuartile = this.firstQuartile(numericData);
        numericStatisticDTO.secondQuartile = this.secondQuartile(numericData);
        numericStatisticDTO.varianceSum = this.varianceSum(numericData);
        numericStatisticDTO.sampleVariance = this.sampleVariance(numericData);
        numericStatisticDTO.populationVariance = this.populationVariance(numericData);
        numericStatisticDTO.sampleStandardDeviation = this.sampleStandardDeviation(numericData);
        numericStatisticDTO.populationStandardDeviation = this.populationStandardDeviation(numericData);
        numericStatisticDTO.coefficientVariation = this.coefficientVariation(numericData);
        numericStatisticDTO.maximum = this.maximum(numericData);
        numericStatisticDTO.minimum = this.minimum(numericData);
        numericStatisticDTO.amplitude = this.amplitude(numericData);

        return numericStatisticDTO;
    }

    /**
     * Mode calc
     *
     * @param data
     * @return
     */
    protected Double mode(List<Double> data) {
        Hashtable<Double, Integer> auxMode = new Hashtable<Double, Integer>();
        int maxFreq = 1;
        double modeElement = data.get(0);
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

        double median;
        if (posM != (int) posM) {
            median = Double.parseDouble(String.valueOf(data.get((int) (posM + 1))));

        } else {
            median = (Double.parseDouble(String.valueOf(data.get((int) posM))) + Double.parseDouble(String.valueOf(data.get((int) posM + 1)))) / 2;
        }

        return median;
    }

    protected Double firstQuartile(List<Double> data) {
        double firstQuartile = 0.0;
        if (data.size() > 4) {
            double pos = ((double) data.size() / 4) - 1;
            if (data.size() % 4 != 0) {
                firstQuartile = Double.parseDouble(String.valueOf(data.get((int) (pos + 1))));
            } else {
                firstQuartile = (Double.parseDouble(String.valueOf(data.get((int) pos))) + Double.parseDouble(String.valueOf(data.get((int) pos + 1)))) / 2;
            }
        }
        return firstQuartile;
    }

    protected Double secondQuartile(List<Double> data) {
        double secondQuartile = 0.0;
        if (data.size() > 4) {
            double pos = ((double) (3 * data.size()) / 4) - 1;
            if (data.size() % 4 != 0) {
                secondQuartile = Double.parseDouble(String.valueOf(data.get((int) pos + 1)));
            } else {
                secondQuartile = (Double.parseDouble(String.valueOf(data.get((int) pos))) + Double.parseDouble(String.valueOf(data.get((int) pos + 1)))) / 2;
            }
        }
        return secondQuartile;
    }

    protected Double varianceSum(List<Double> data) {
        double varianceSum = 0.0;
        double mean = this.mean(data);

        for (var dat :
                data) {
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

}
