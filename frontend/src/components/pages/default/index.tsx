import React, { useRef, useState } from 'react';
import Home from '../../templates/home';
import InsertData from '../../templates/insert_data';
import { DisplayTable } from 'components/templates/display_table';
import { type TableData } from 'components/organisms/datasheet';

import Analysis from 'components/templates/analysis';
import SelectFile from 'components/templates/select_file';

import SidebarHome from '../../organisms/sidebar/sidebarhome';
import SidebarInsert from 'components/organisms/sidebar/sidebarinsertdata';
import SidebarData from 'components/organisms/sidebar/sidebardata';

import './styles.css';
import { type IAnalysis } from 'api/statisticApi/models/IAnalysis';

export enum ApplicationPage {
	HOME,
	INSERT_DATA,
	SELECT_FILE,
	DISPLAY_TABLE,
	ANALYSIS,
}

const Default: React.FC = () => {
	const [appState, setAppState] = useState(ApplicationPage.DISPLAY_TABLE);
	const tableDataRef = useRef<TableData | null>(null);

	// source: IColumn;
	// analysisCalcs: INumericStatisticData | INonNumericStatisticData;
	const statisticalDataRef = useRef<IAnalysis>({
		source: { data: ['sim'], title: '', numericData: false },
		analysisCalcs: { mode: '', frequency: {} },
	});
	const handleInsertDataButtonClick = (): void => {
		setAppState(ApplicationPage.INSERT_DATA);
	};

	const handleVoltarHomeButtonClick = (): void => {
		setAppState(ApplicationPage.HOME);
	};

	const handleVoltarInsertButtonClick = (): void => {
		setAppState(ApplicationPage.INSERT_DATA);
	};

	const handleVoltarDisplayButtonClick = (): void => {
		setAppState(ApplicationPage.DISPLAY_TABLE);
	};

	const handleInsertManuallyClick = (): void => {
		setAppState(ApplicationPage.DISPLAY_TABLE);
	};

	const handleInsertSendFileClick = (): void => {
		setAppState(ApplicationPage.SELECT_FILE);
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
				<SidebarInsert onVoltarClick={handleVoltarHomeButtonClick} />
			);
			pageToRender = (
				<InsertData
					onInsertManuallyClick={handleInsertManuallyClick}
					onInsertSendFileClick={handleInsertSendFileClick}
				/>
			);
			break;
		case ApplicationPage.SELECT_FILE:
			sidebarToRender = (
				<SidebarInsert onVoltarClick={handleVoltarInsertButtonClick} />
			);
			pageToRender = (
				<SelectFile tableDataRef={tableDataRef} setAppState={setAppState} />
			);
			break;
		case ApplicationPage.DISPLAY_TABLE:
			sidebarToRender = (
				<SidebarData onVoltarClick={handleVoltarInsertButtonClick} />
			);
			pageToRender = (
				<DisplayTable
					tableDataRef={tableDataRef}
					statisticalDataRef={statisticalDataRef}
					setAppState={setAppState}
				/>
			);
			break;
		case ApplicationPage.ANALYSIS:
			sidebarToRender = (
				<SidebarData onVoltarClick={handleVoltarDisplayButtonClick} />
			);
			pageToRender = <Analysis statisticalDataRef={statisticalDataRef} />;
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
