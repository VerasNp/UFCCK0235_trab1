import React, { useRef, useState } from 'react';
import Home from '../../templates/home';
import InsertData from '../../templates/insert_data';
import Sidebar from '../../organisms/sidebar';
import { DisplayTable } from 'components/templates/display_table';
import {
	type ColumnOutputData,
	type TableData,
} from 'components/organisms/datasheet';
import { obtainTableData, tableDataFetched } from 'utils/io';

import './styles.css';

export enum ApplicationPage {
	HOME,
	INSERT_DATA,
	DISPLAY_TABLE,
	ANALYSIS,
}

const Default: React.FC = () => {
	const [appState, setAppState] = useState(ApplicationPage.DISPLAY_TABLE);
	const tableDataRef = useRef<TableData>(obtainTableData(tableDataFetched));
	const columnToAnalyseRef = useRef<ColumnOutputData>({
		title: '',
		data: [''],
		isNumeric: '0',
	});

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
			pageToRender = (
				<DisplayTable
					tableDataRef={tableDataRef}
					columnToAnalyzeRef={columnToAnalyseRef}
					setAppState={setAppState}
				/>
			);
			break;
		case ApplicationPage.ANALYSIS:
			pageToRender = <div>análise</div>;
			console.log(columnToAnalyseRef.current);
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
