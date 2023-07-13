import React from 'react';
import { Cell, type CellProps } from '../cell';

export const TextCell: React.FC<CellProps> = ({
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
	// Text is always allowed, there is no problem if the user input a number in a string cell
	const isInputAllowed = (input: string): boolean => true;

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
