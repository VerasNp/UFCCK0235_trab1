import { DataSheet, type TableData } from 'components/organisms/datasheet';
import React, { type MutableRefObject } from 'react';
import './styles.css';

interface Props {
	tableDataRef: MutableRefObject<TableData>;
}

export const DisplayTable: React.FC<Props> = ({ tableDataRef }) => {
	return (
		<div className="display-table-page">
			<DataSheet tableDataRef={tableDataRef} />
		</div>
	);
};
