import {
	type ColumnOutputData,
	DataSheet,
	type TableData,
} from 'components/organisms/datasheet';
import { type ApplicationPage } from 'components/pages/default';
import React, { type MutableRefObject } from 'react';
import './styles.css';

interface Props {
	tableDataRef: MutableRefObject<TableData>;
	columnToAnalyzeRef: MutableRefObject<ColumnOutputData>;
	setAppState: (state: ApplicationPage) => void;
}

export const DisplayTable: React.FC<Props> = ({
	tableDataRef,
	columnToAnalyzeRef,
	setAppState,
}) => {
	return (
		<div className="display-table-page">
			<DataSheet
				tableDataRef={tableDataRef}
				columnToAnalyzeRef={columnToAnalyzeRef}
				setAppState={setAppState}
			/>
		</div>
	);
};
