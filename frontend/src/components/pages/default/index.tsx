import React, { useState } from 'react';
import Navbar from '../../organisms/navbar';
import Home from '../../templates/home';
import InsertData from '../../templates/insert_data';

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
			// Not implemented
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
			<Navbar onInsertDataClick={handleInsertDataButtonClick} />
			{pageToRender}
		</div>
	);
};

export default Default;
