import React, { type MutableRefObject, useState } from 'react';
import SelectChart from '../../organisms/select_chart';
import './styles.css';
import Chart from '../../atoms/chart';
import { type ChartsEnum } from '../../bosons/enums';
import ResumeData from '../../molecules/resume_data';
import { type IAnalysis } from '../../../api/statisticApi/models/IAnalysis';
import { getTranslation } from '../../bosons/translation';

interface AnalysisProps {
	statisticalDataRef: MutableRefObject<IAnalysis>;
}

const Analysis: React.FC<AnalysisProps> = ({ statisticalDataRef }) => {
	const [chart, setChart] = useState<ChartsEnum | null>(null);
	const data = statisticalDataRef.current;
	return (
		<>
			<div className={'container'}>
				<SelectChart dataType={data.source.numericData} setChart={setChart} />
				<div className={'chart'}>
					<Chart data={data?.source.data} auxData={data} chartType={chart} />
				</div>
				{chart != null ? (
					<div className={'resume-content'}>
						{Object.entries(data.analysisCalcs)
							.filter((entry) => entry[0] !== 'frequency')
							.map(([key, value], index) => (
								<ResumeData
									title={getTranslation(key)}
									value={data.source.numericData ? value.toFixed(4) : value}
									key={index}
								/>
							))}
					</div>
				) : (
					''
				)}
			</div>
		</>
	);
};

export default Analysis;
