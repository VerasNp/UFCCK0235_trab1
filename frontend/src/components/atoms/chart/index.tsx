import React from 'react';
import {
	VictoryAxis,
	VictoryBar,
	VictoryBoxPlot,
	VictoryChart,
	VictoryHistogram,
	VictoryPie,
	VictoryTheme,
} from 'victory';

import './styles.css';
import { ChartsEnum } from '../../bosons/enums';
import { type IColumn } from '../../../api/statisticApi/models/IColumn';

interface Props {
	chartType: ChartsEnum | null;
	data: string[] | undefined;
	auxData: {
		source: IColumn;
		analysisCalcs: any;
	} | null;
}

let chart: React.ReactElement | null;
const Chart: React.FC<Props> = ({ chartType, data, auxData }) => {
	const groupedData = (data: string[]): object[] => {
		const aux: object[] = [];
		data.forEach((e) => {
			aux.push({ x: e });
		});
		return aux;
	};

	const frequencyQualitativeData = (
		dataFreq: object
	): Array<{ x: string; y: number }> => {
		const aux: Array<{ x: string; y: number }> = [];
		Object.entries(dataFreq).forEach(([key, value]) => {
			aux.push({ x: key, y: value });
		});
		return aux;
	};

	switch (chartType) {
		case ChartsEnum.BAR:
			if (auxData?.source.numericData === true) {
				chart = (
					<VictoryChart theme={VictoryTheme.material} domainPadding={80}>
						<VictoryBar data={auxData.source.data} />
						<VictoryAxis dependentAxis />
					</VictoryChart>
				);
			} else {
				chart = (
					<VictoryChart theme={VictoryTheme.material} domainPadding={60}>
						<VictoryBar
							data={frequencyQualitativeData(auxData?.analysisCalcs.frequency)}
						/>
					</VictoryChart>
				);
			}
			break;
		case ChartsEnum.BOX_PLOT:
			chart = (
				<VictoryChart theme={VictoryTheme.material} domainPadding={60}>
					<VictoryBoxPlot
						boxWidth={20}
						data={[
							{
								x: 1,
								y: [
									auxData?.analysisCalcs.minimum,
									auxData?.analysisCalcs.median,
									auxData?.analysisCalcs.maximum,
									auxData?.analysisCalcs.firstQuartile,
									auxData?.analysisCalcs.thirdQuartile,
								],
							},
						]}
						domain={{ x: [1, 2], y: [0, auxData?.analysisCalcs.maximum] }}
					/>
					<VictoryAxis dependentAxis />
				</VictoryChart>
			);
			break;
		case ChartsEnum.PIE:
			if (auxData?.source.numericData === true) {
				chart = (
					<VictoryPie
						theme={VictoryTheme.material}
						data={frequencyQualitativeData(auxData.analysisCalcs.frequency)}
					/>
				);
			} else {
				chart = (
					<VictoryPie
						theme={VictoryTheme.material}
						data={frequencyQualitativeData(auxData?.analysisCalcs.frequency)}
					/>
				);
			}
			break;
		case ChartsEnum.HISTOGRAM:
			chart = (
				<VictoryChart theme={VictoryTheme.material} domainPadding={60}>
					<VictoryHistogram data={data != null ? groupedData(data) : []} />
				</VictoryChart>
			);
			break;
		default:
			chart = null;
			break;
	}

	return <>{chart != null ? chart : ''}</>;
};

export default Chart;
