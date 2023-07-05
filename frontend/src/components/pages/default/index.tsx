import React, { useRef, useState } from 'react';
import Home from '../../templates/home';
import InsertData from '../../templates/insert_data';
import { DisplayTable } from 'components/templates/display_table';
import {
	type ColumnOutputData,
	type TableData,
} from 'components/organisms/datasheet';
import { obtainTableData, tableDataFetched } from 'utils/io';

import Analysis from 'components/templates/analysis';

import SidebarHome from '../../organisms/sidebar/sidebarhome';
import SidebarInsert from 'components/organisms/sidebar/sidebarinsertdata';
import SidebarData from 'components/organisms/sidebar/sidebardata';

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

	const handleVoltarButtonClick = (): void => {
		setAppState(ApplicationPage.HOME);
	};

	const handleInsertManuallyClick = (): void => {
		setAppState(ApplicationPage.DISPLAY_TABLE);
	};

	let sidebarToRender;
	let pageToRender;

	// Everytime appState changes, pageToRender will also change accordingly
	switch (appState) {
		case ApplicationPage.HOME:
			sidebarToRender = (
				<SidebarHome onInsertDataClick={handleInsertDataButtonClick} />
			);
			pageToRender = <Home />;
			break;
		case ApplicationPage.INSERT_DATA:
			sidebarToRender = (
				<SidebarInsert onVoltarClick={handleVoltarButtonClick} />
			);
			pageToRender = (
				<InsertData onInsertManuallyClick={handleInsertManuallyClick} />
			);
			break;
		case ApplicationPage.DISPLAY_TABLE:
			sidebarToRender = <SidebarData onVoltarClick={handleVoltarButtonClick} />;
			pageToRender = (
				<DisplayTable
					tableDataRef={tableDataRef}
					columnToAnalyzeRef={columnToAnalyseRef}
					setAppState={setAppState}
				/>
			);
			break;
		case ApplicationPage.ANALYSIS:
			sidebarToRender = <SidebarData onVoltarClick={handleVoltarButtonClick} />;
			pageToRender = <Analysis />;
			console.log(columnToAnalyseRef.current);
			break;
		default:
			sidebarToRender = (
				<SidebarHome onInsertDataClick={handleInsertDataButtonClick} />
			);
			pageToRender = <Home />;
			break;
	}

	return (
		<div className="page-layout">
			{sidebarToRender}
			{pageToRender}
		</div>
	);
};

export default Default;
