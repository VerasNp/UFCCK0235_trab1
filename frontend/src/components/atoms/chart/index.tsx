import React from 'react';
import {
	VictoryBar,
	VictoryBoxPlot,
	VictoryChart,
	VictoryHistogram,
	VictoryPie,
} from 'victory';

import './styles.css';
import { ChartsEnum } from '../../bosons/enums';
import { type ColumnData } from '../../bosons/types';

interface Props {
	chartType: ChartsEnum | null;
	data: ColumnData;
}

let chart: React.ReactElement | null;
const Chart: React.FC<Props> = ({ chartType, data }) => {
	switch (chartType) {
		case ChartsEnum.BAR:
			chart = <VictoryBar data={data.data} />;
			break;
		case ChartsEnum.BOX_PLOT:
			chart = <VictoryBoxPlot data={data.data} />;
			break;
		case ChartsEnum.HISTOGRAM:
			chart = <VictoryHistogram data={data.data} />;
			break;
		case ChartsEnum.PIE:
			chart = <VictoryPie data={data.data} />;
			break;
		default:
			chart = null;
			break;
	}

	return <>{chart != null ? <VictoryChart>{chart}</VictoryChart> : ''}</>;
};

export default Chart;
