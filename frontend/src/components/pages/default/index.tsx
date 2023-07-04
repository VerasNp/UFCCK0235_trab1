import React, { useRef, useState } from 'react';
import Home from '../../templates/home';
import InsertData from '../../templates/insert_data';
import Sidebar from '../../organisms/sidebar';

import './styles.css';
import { DisplayTable } from 'components/templates/display_table';
import { type TableData } from 'components/organisms/datasheet';
import { type Cell } from 'components/atoms/text_cell';

enum ApplicationPage {
	HOME,
	INSERT_DATA,
	DISPLAY_TABLE,
	ANALYSIS,
}

interface dataFetched {
	data: Array<Record<string, string>>;
	columns: Record<string, string>;
}

type TemporaryData = Record<string, { data: string[]; type: string }>;

const tableDataFetched = {
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

const obtainTableData = (data: TemporaryData): TableData => {
	const grid: Cell[][] = [];
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

const Default: React.FC = () => {
	const [appState, setAppState] = useState(ApplicationPage.DISPLAY_TABLE);
	const tableDataRef = useRef<TableData>(
		obtainTableData(obtainTemporaryData(tableDataFetched))
	);

	const handleInsertDataButtonClick = (): void => {
		setAppState(ApplicationPage.INSERT_DATA);
	};

	let pageToRender;

	// Everytime appState changes, pageToRender will also change accordingly
	switch (appState) {
		case ApplicationPage.HOME:
			pageToRender = <Home />;
			break;
		case ApplicationPage.INSERT_DATA:
			pageToRender = <InsertData />;
			break;
		case ApplicationPage.DISPLAY_TABLE:
			pageToRender = <DisplayTable tableDataRef={tableDataRef} />;
			break;
		case ApplicationPage.ANALYSIS:
			// Not implemented
			break;
		default:
			pageToRender = <Home />;
			break;
	}

	return (
		<div className="page-layout">
			<Sidebar onInsertDataClick={handleInsertDataButtonClick} />
			{pageToRender}
		</div>
	);
};

export default Default;
