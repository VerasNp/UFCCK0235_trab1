export interface INumericStatisticData {
	mean: number;
	mode: number;
	median: number;
	firstQuartile: number;
	thirdQuartile: number;
	varianceSum: number;
	sampleVariance: number;
	populationVariance: number;
	sampleStandardDeviation: number;
	populationStandardDeviation: number;
	coefficientVariation: number;
	maximum: number;
	minimum: number;
	amplitude: number;
	frequency: object;
}
