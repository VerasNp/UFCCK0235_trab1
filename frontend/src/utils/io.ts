import { type CellData } from 'components/atoms/cell';
import { type TableData } from 'components/organisms/datasheet';

// Data will come in this format from backend
interface dataFetched {
	data: Array<Record<string, string>>;
	columns: Record<string, string>;
}

// We convert temporarily the dataFetched to this type
type TemporaryData = Record<string, { data: string[]; type: string }>;

// Temporary, should be deleted after fetching of data is implemented and passed to Default Component
export const tableDataFetched = {
	data: [
		{
			firstName: 'Elon',
			lastNameFockingAwesomeIncredibleBlastingIdiot: 'Musk',
			age: '38',
			address: 'California',
			pet: 'dog',
			salary: '3500420',
		},
		{
			firstName: 'Jeff',
			lastNameFockingAwesomeIncredibleBlastingIdiot: 'Bezos',
			age: '59',
			address: 'Miami',
			pet: 'tiger',
			salary: '8504221',
		},
		{
			firstName: 'Xuxa',
			lastNameFockingAwesomeIncredibleBlastingIdiot: 'Meneguel',
			age: '65',
			address: 'São Paulo',
			pet: 'Parrot',
			salary: '600200.37',
		},
	],
	columns: {
		firstName: 'string',
		lastNameFockingAwesomeIncredibleBlastingIdiot: 'string',
		age: 'int',
		address: 'string',
		pet: 'string',
		salary: 'float',
	},
};

export const obtainTableData = (dataFetched: dataFetched): TableData => {
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
	return { grid, types: columnTypes };
};

const obtainTemporaryData = (data: dataFetched): TemporaryData => {
	let nData: TemporaryData = {};
	data.data.forEach((row) => {
		Object.keys(row).forEach((key) => {
			if (nData[key] !== undefined) {
				nData[key].data.push(row[key]);
			} else {
				nData = {
					...nData,
					[key]: {
						data: [row[key]],
						type: data.columns[key],
					},
				};
			}
		});
	});

	return nData;
};
