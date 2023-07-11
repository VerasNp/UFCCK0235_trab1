import React, { useState } from 'react';
import SelectChart from '../../organisms/select_chart';
import './styles.css';
import Chart from '../../atoms/chart';
import { type ChartsEnum } from '../../bosons/enums';
import ResumeData from '../../molecules/resume_data';
import { type IAnalysis } from '../../../api/statisticApi/models/IAnalysis';
import { getTranslation } from '../../bosons/translation';

const data: IAnalysis = {
	source: {
		title: 'Turma Trtbe',
		data: [
			'1',
			'1',
			'2',
			'2',
			'2',
			'3',
			'3',
			'3',
			'3',
			'4',
			'5',
			'5',
			'6',
			'6',
		],
		numericData: true,
	},
	analysisCalcs: {
		mean: 3.2857142857142856,
		mode: 6,
		median: 3,
		firstQuartile: 2,
		thirdQuartile: 5,
		varianceSum: 36.857142857142854,
		sampleVariance: 2.835164835164835,
		populationVariance: 2.6326530612244894,
		sampleStandardDeviation: 1.6837947722821909,
		populationStandardDeviation: 1.6225452416572208,
		coefficientVariation: 49.38181170261107,
		maximum: 6,
		minimum: 1,
		amplitude: 5,
		frequency: {
			1.0: 14.285714285714286,
			2.0: 21.428571428571427,
			4.0: 7.142857142857143,
			5.0: 14.285714285714286,
			3.0: 28.571428571428573,
			6.0: 14.285714285714286,
		},
	},
};

// const data: IAnalysis = {
// 	source: {
// 		title: 'asd',
// 		data: [
// 			'Preto',
// 			'Vermelho',
// 			'Preto',
// 			'Amarelo',
// 		],
// 		numericData: false,
// 	},
// 	analysisCalcs: {
// 		mode: 'Preto',
// 		frequency: {
// 			vermelho: 25,
// 			preto: 50,
// 			amarelo: 25,
// 		},
// 	},
// };

const Analysis: React.FC = () => {
	const [chart, setChart] = useState<ChartsEnum | null>(null);
	return (
		<>
			<div className={'container'}>
				<SelectChart dataType={data.source.numericData} setChart={setChart} />
				<div className={'chart-display-w-resume'}>
					<div className={'chart'}>
						<Chart
							height={650}
							data={data.source.data}
							auxData={data}
							chartType={chart}
						/>
					</div>
					{chart != null ? (
						<div className={'resume-content'}>
							{Object.entries(data.analysisCalcs)
								.filter((entry) => entry[0] !== 'frequency')
								.map(([key, value], index) => (
									<ResumeData
										title={getTranslation(key)}
										value={value.toFixed(2)}
										key={index}
									/>
								))}
						</div>
					) : (
						''
					)}
				</div>
			</div>
		</>
	);
};

export default Analysis;
