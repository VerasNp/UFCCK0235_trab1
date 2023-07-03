import React, { useState } from 'react';
import Home from '../../templates/home';
import InsertData from '../../templates/insert_data';
import Display from 'components/templates/display_table';
import Analysis from 'components/templates/analysis';

import SidebarHome from '../../organisms/sidebar/sidebarhome';
import SidebarInsert from 'components/organisms/sidebar/sidebarinsertdata';
import SidebarData from 'components/organisms/sidebar/sidebardata';

import './styles.css';

enum ApplicationPage {
	HOME,
	INSERT_DATA,
	DISPLAY_TABLE,
	ANALYSIS,
}

const Default: React.FC = () => {
	const [appState, setAppState] = useState(ApplicationPage.HOME);

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
				<InsertData onInsertManuallyClick={handleInsertManuallyClick} />
			);
			break;
		case ApplicationPage.DISPLAY_TABLE:
			sidebarToRender = (
				<SidebarData onVoltarClick={handleVoltarInsertButtonClick} />
			);
			pageToRender = <Display />;

			break;
		case ApplicationPage.ANALYSIS:
			sidebarToRender = (
				<SidebarData onVoltarClick={handleVoltarDisplayButtonClick} />
			);
			pageToRender = <Analysis />;
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
