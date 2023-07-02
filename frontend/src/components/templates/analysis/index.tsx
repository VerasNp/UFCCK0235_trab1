import React, { useState } from 'react';
import SelectChart from '../../organisms/select_chart';
import './styles.css';
import Chart from '../../atoms/chart';
import { type ChartsEnum } from '../../bosons/enums';
import { type AnalysisData } from '../../bosons/types';
import ResumeData from '../../molecules/resume_data';

const data: AnalysisData = {
	title: 'Coluna Teste 1',
	isNumeric: false,
	data: ['teste1', 'teste2'],
	analysisCalcs: [
		{
			title: 'Teste1',
			value: 3.0,
		},
		{
			title: 'Teste2',
			value: 3.0,
		},
		{
			title: 'Teste3',
			value: 3.0,
		},
		{
			title: 'Teste4',
			value: 3.0,
		},
		{
			title: 'Teste5',
			value: 3.0,
		},
		{
			title: 'Teste6',
			value: 3.0,
		},
	],
};

const Analysis: React.FC = () => {
	const [chart, setChart] = useState<ChartsEnum | null>(null);
	return (
		<>
			<div className={'container'}>
				<SelectChart dataType={data.isNumeric} setChart={setChart} />
				<Chart data={data} chartType={chart} />
				{chart != null ? (
					<div className={'resume-content'}>
						{data.analysisCalcs?.map((e, index) => (
							<ResumeData title={e.title} value={e.value} key={index} />
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
