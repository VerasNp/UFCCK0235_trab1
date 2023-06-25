import React from 'react';
import {
	VictoryBar,
	VictoryBoxPlot,
	VictoryChart,
	VictoryHistogram,
	VictoryPie,
} from 'victory';

import './styles.css';

enum Charts {
	HISTOGRAM,
	PIE,
	BOX_PLOT,
	BAR,
}

interface Props {
	chartType: Charts;
}

let chart: React.ReactElement | null;
const Chart: React.FC<Props> = ({ chartType }) => {
	switch (chartType) {
		case Charts.BAR:
			chart = <VictoryBar />;
			break;
		case Charts.BOX_PLOT:
			chart = <VictoryBoxPlot />;
			break;
		case Charts.HISTOGRAM:
			chart = <VictoryHistogram />;
			break;
		case Charts.PIE:
			chart = <VictoryPie />;
			break;
		default:
			chart = null;
			break;
	}

	return (
		<>
			<VictoryChart>{chart}</VictoryChart>
		</>
	);
};

export default Chart;
