import React from 'react';
import {
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
	data: string[];
	auxData: {
		source: IColumn;
		analysisCalcs: any;
	};
	height: number;
}

let chart: React.ReactElement | null;
const Chart: React.FC<Props> = ({ chartType, data, auxData, height }) => {
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
			if (auxData.source.numericData) {
				chart = (
					<VictoryChart
						height={height}
						width={height}
						theme={VictoryTheme.material}
						domainPadding={60}
					>
						<VictoryBar
							data={frequencyQualitativeData(auxData.analysisCalcs.frequency)}
						/>
					</VictoryChart>
				);
			} else {
				chart = (
					<VictoryChart
						height={height}
						width={height}
						theme={VictoryTheme.material}
						domainPadding={60}
					>
						<VictoryBar
							data={frequencyQualitativeData(auxData.analysisCalcs.frequency)}
						/>
					</VictoryChart>
				);
			}
			break;
		case ChartsEnum.BOX_PLOT:
			chart = (
				<VictoryChart
					height={height}
					width={height}
					theme={VictoryTheme.material}
					domainPadding={60}
				>
					<VictoryBoxPlot
						boxWidth={20}
						data={[
							{
								x: 1,
								y: [
									auxData.analysisCalcs.minimum,
									auxData.analysisCalcs.median,
									auxData.analysisCalcs.maximum,
									auxData.analysisCalcs.firstQuartile,
									auxData.analysisCalcs.thirdQuartile,
								],
							},
						]}
						domain={{ x: [1, 2], y: [0, auxData.analysisCalcs.maximum] }}
					/>
				</VictoryChart>
			);
			break;
		case ChartsEnum.PIE:
			if (auxData.source.numericData) {
				chart = (
					<VictoryPie
						height={height}
						width={height}
						theme={VictoryTheme.material}
						data={frequencyQualitativeData(auxData.analysisCalcs.frequency)}
					/>
				);
			} else {
				chart = (
					<VictoryPie
						height={height}
						width={height}
						theme={VictoryTheme.material}
						data={frequencyQualitativeData(auxData.analysisCalcs.frequency)}
					/>
				);
			}
			break;
		case ChartsEnum.HISTOGRAM:
			chart = (
				<VictoryChart
					height={height}
					width={height}
					theme={VictoryTheme.material}
					domainPadding={60}
				>
					<VictoryHistogram data={groupedData(data)} />
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
