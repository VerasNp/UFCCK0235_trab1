export const ResumeFields = {
	mean: 'Média',
	mode: 'Moda',
	median: 'Mediana',
	firstQuartile: 'Primeiro Quartil',
	thirdQuartile: 'Terceiro Quartil',
	varianceSum: 'Soma de Variância',
	sampleVariance: 'Variância Amostral',
	populationVariance: 'Variância Populacional',
	sampleStandardDeviation: 'Desvio Padrão Amostral',
	populationStandardDeviation: 'Desvio Padrão Populacional',
	coefficientVariation: 'Coeficiente de Variação',
	maximum: 'Máximo',
	minimum: 'Mínimo',
	amplitude: 'Amplitude',
};

export const getTranslation = (key: string): string => {
	const keyTyp = key as keyof typeof ResumeFields;
	return ResumeFields[keyTyp];
};
