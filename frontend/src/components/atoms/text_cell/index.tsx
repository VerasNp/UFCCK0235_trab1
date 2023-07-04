import { type TableData } from 'components/organisms/datasheet';
import React, { type CSSProperties, useState } from 'react';

import './styles.css';

export interface Cell {
	value: string;
	isSelected: boolean;
}

export interface TextCellProps {
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
	setTableData: (table: TableData) => void;
	saveTable: (table: TableData) => void;
}

export const TextCell: React.FC<TextCellProps> = ({
	title,
	style,
	isSelected,
	isColumnTitle = false,
	setSelected,
	tableUnselected,
	setTableData,
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

	const saveInputToTable = (e?: React.FocusEvent<HTMLInputElement>): void => {
		const grid = tableData.grid.map((c, cIndex) => {
			if (cIndex === column) {
				return c.map((cell, rIndex) => {
					if (rIndex === row) {
						if (e != null) {
							return { value: e.target.value, isSelected: false };
						}
						return { value: instantTitle, isSelected: false };
					}
					return cell;
				});
			}
			return c;
		});
		saveTable({ ...tableData, grid });
	};

	const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
		setInputActive(false);
		saveInputToTable(e);
	};

	const handleKeyDown = (e: React.KeyboardEvent): void => {
		if (e.key === 'Enter') {
			setInputActive(false);
			saveInputToTable();
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
					// style={{  fontSize: 17}}/
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
