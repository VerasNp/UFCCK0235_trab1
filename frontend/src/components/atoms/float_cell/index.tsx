import React from 'react';
import { Cell, type CellProps } from '../cell';

export const FloatCell: React.FC<CellProps> = ({
	title,
	style,
	isSelected,
	isColumnTitle,
	row,
	column,
	tableData,
	setSelected,
	tableUnselected,
	saveTable,
}) => {
	// we check if the text inputed can be a float
	const isInputAllowed = (input: string): boolean => {
		return /^\d+(\.\d+)?$/.test(input);
	};

	return (
		<>
			<Cell
				title={title}
				style={style}
				isSelected={isSelected}
				isColumnTitle={isColumnTitle}
				row={row}
				column={column}
				tableData={tableData}
				setSelected={setSelected}
				tableUnselected={tableUnselected}
				saveTable={saveTable}
				isInputAllowed={isInputAllowed}
			/>
		</>
	);
};
