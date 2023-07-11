import { type IColumn } from './IColumn';
import { type INumericStatisticData } from './INumericStatisticData';
import { type INonNumericStatisticData } from './INonNumericStatisticData';

export interface IAnalysis {
	source: IColumn;
	analysisCalcs: INumericStatisticData | INonNumericStatisticData;
}
