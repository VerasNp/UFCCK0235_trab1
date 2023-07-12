import { type CellData } from 'components/atoms/cell';
import { type TableData } from 'components/organisms/datasheet';
import { type IFileResponse } from '../api/statisticApi/models/IFileResponse';

// We convert temporarily the dataFetched to this type
type TemporaryData = Record<string, { data: string[]; type: string }>;

export const obtainTableData = (dataFetched: IFileResponse): TableData => {
	const data = obtainTemporaryData(dataFetched);
	const grid: CellData[][] = [];
	const columnTypes: string[] = [];
	Object.keys(data).forEach((column) => {
		let cells = data[column].data.map((value) => ({
			value,
			isSelected: false,
		}));
		cells = [{ value: column, isSelected: false }, ...cells];
		grid.push(cells);
		columnTypes.push(data[column].type);
	});
	console.log({ grid, types: columnTypes });
	return { grid, types: columnTypes };
};

const obtainTemporaryData = (data: IFileResponse): TemporaryData => {
	let nData: TemporaryData = {};
	data.dados.forEach((row) => {
		Object.keys(row).forEach((key) => {
			if (nData[key] !== undefined) {
				nData[key].data.push(row[key]);
			} else {
				nData = {
					...nData,
					[key]: {
						data: [row[key]],
						type: data.colunas[key],
					},
				};
			}
		});
	});
	return nData;
};
