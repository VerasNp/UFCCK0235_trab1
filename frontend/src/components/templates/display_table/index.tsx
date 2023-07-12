import { type IAnalysis } from 'api/statisticApi/models/IAnalysis';
import { DataSheet, type TableData } from 'components/organisms/datasheet';
import { type ApplicationPage } from 'components/pages/default';
import React, { type MutableRefObject } from 'react';
import './styles.css';

interface Props {
	tableDataRef: MutableRefObject<TableData>;
	statisticalDataRef: MutableRefObject<IAnalysis | null>;
	setAppState: (state: ApplicationPage) => void;
}

export const DisplayTable: React.FC<Props> = ({
	tableDataRef,
	statisticalDataRef,
	setAppState,
}) => {
	return (
		<div className="display-table-page">
			<DataSheet
				tableDataRef={tableDataRef}
				statisticalDataRef={statisticalDataRef}
				setAppState={setAppState}
			/>
		</div>
	);
};
