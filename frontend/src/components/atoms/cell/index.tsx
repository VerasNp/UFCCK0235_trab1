import { type TableData } from 'components/organisms/datasheet';
import React, { type CSSProperties, useState } from 'react';

import './styles.css';

export interface CellData {
	value: string;
	isSelected: boolean;
}

export interface CellProps {
	title: string;
	style?: CSSProperties;
	isSelected: boolean;
	isColumnTitle: boolean;
	row: number;
	column: number;
	tableData: TableData;
	setSelected: (
		table: TableData,
		row: number,
		column: number,
		oneClick: boolean
	) => void;
	tableUnselected: () => TableData;
	saveTable: (table: TableData) => void;
}

interface GeneralCellProps {
	title: string;
	style?: CSSProperties;
	isSelected: boolean;
	isColumnTitle: boolean;
	row: number;
	column: number;
	tableData: TableData;
	isInputAllowed: (input: string) => boolean;
	setSelected: (
		table: TableData,
		row: number,
		column: number,
		oneClick: boolean
	) => void;
	tableUnselected: () => TableData;
	saveTable: (table: TableData) => void;
}

export const Cell: React.FC<GeneralCellProps> = ({
	title,
	style,
	isSelected,
	isColumnTitle = false,
	setSelected,
	tableUnselected,
	isInputAllowed,
	saveTable,
	tableData,
	row,
	column,
}) => {
	const [instantTitle, setInstantTitle] = useState(title);
	const [inputActive, setInputActive] = useState(false);

	const handleClick = (): void => {
		if (isSelected) return;
		const table = tableUnselected();
		setSelected(table, row, column, true);
	};

	const handleDoubleClick = (): void => {
		setInputActive(true);
		const table = tableUnselected();
		setSelected(table, row, column, false);
	};

	const handleTitleChanged = (e: any): void => {
		e.preventDefault();
		setInstantTitle(e.target.value);
	};

	// This function is required to maintain tableData updated
	const saveInputToTable = (input: string): void => {
		const grid = tableData.grid.map((c, cIndex) => {
			if (cIndex === column) {
				return c.map((cell, rIndex) => {
					if (rIndex === row) {
						return { value: input, isSelected: false };
					}
					return cell;
				});
			}
			return c;
		});
		saveTable({ ...tableData, grid });
	};

	// Everytime a cell input changes, we validate if the input has the type specified by the column
	const handleInputChanged = (input: string): void => {
		// if the cell is a column title we just save it
		if (row === 0) {
			saveInputToTable(input);
			return;
		}

		if (!isInputAllowed(input)) {
			alert(`Formato de dado incorreto`);
			saveInputToTable('');
			setInstantTitle('');
		} else {
			saveInputToTable(input);
		}
	};

	const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
		setInputActive(false);
		handleInputChanged(e.target.value);
	};

	const handleKeyDown = (e: React.KeyboardEvent): void => {
		if (e.key === 'Enter') {
			setInputActive(false);
			handleInputChanged(instantTitle);
		}
	};

	let className = 'cell';
	if (isSelected) className += ' highlighted';
	if (isColumnTitle) className += ' column-title';

	return (
		<div
			className={className}
			onDoubleClick={handleDoubleClick}
			onClick={handleClick}
			style={style}
		>
			{inputActive ? (
				<input
					type="text"
					className={isColumnTitle ? 'title' : ''}
					style={{ width: instantTitle.length * 10, fontSize: 17 }}
					value={instantTitle}
					autoFocus
					onBlur={handleOnBlur}
					onChange={handleTitleChanged}
					onKeyDown={handleKeyDown}
				/>
			) : (
				<div className="unselectable">{instantTitle}</div>
			)}
		</div>
	);
};
