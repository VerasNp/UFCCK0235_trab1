package com.example.app.services;

import com.example.app.services.interfaces.IStatisticService;

import java.util.List;

public class NumericDataStatisticService implements IStatisticService {


    @Override
    public void calculate(List<String> data) {
        List<Double> numericData = data.stream()
                .map(Double::parseDouble).toList();
        Double mode = this.mean(numericData);
    }

//    /**
//     * Mode calc
//     * @param data
//     * @return
//     */
//    protected Double mode(List<Double> data) {
//        Hashtable<Double, Integer> auxMode = new Hashtable<Double, Integer>();
//        int maxFreq = 1;
//        double modeElement = data.get(0);
//        auxMode.put(modeElement, maxFreq);
//        for (var dat:
//             data) {
//            if(auxMode.containsKey(dat)) {
//                if (auxMode.get(dat) > maxFreq) {
//
//                } else {
//                    auxMode.put(dat, auxMode.get(dat) + 1);
//                }
//            } else {
//                auxMode.put(dat, 1);
//            }
//        }
//
//        return  modeElement
//    }
//
//    /**
//     *
//     * @return
//     */
//    protected Double median() {
//
//    }

    /**
     *
     * @param data
     * @return
     */
    protected Double mean(List<Double> data) {
        var sum = data.stream().mapToDouble(Double::doubleValue).sum();
        return sum/data.size();
    }
//
//    protected Double firstQuartile(){}
//    protected Double secondQuartile(){}
//
//    protected Double standardDeviation() {}
//
//    protected Double variance(){}
//
//    /**
//     * Measure of dispersion
//     * @return
//     */
//    protected Double coefficientVariation() {}
//
//    protected Double amplitude() {}
//
//    protected Double maximum() {}
//
//    protected Double minimum() {}
}
