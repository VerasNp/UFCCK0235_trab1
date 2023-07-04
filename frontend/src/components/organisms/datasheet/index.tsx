import { ColumnCells } from 'components/atoms/column_cells';
import { type Cell, TextCell } from 'components/atoms/text_cell';
import React, { type MutableRefObject, useState, useRef, useEffect } from 'react';

import './styles.css';

export interface Props {
	tableDataRef: MutableRefObject<TableData>;
}

export interface TableData {
	grid: Cell[][];
	types: string[];
	columnSelected?: number;
}

// When the user hit the save button, we update tableDataRef
export const DataSheet: React.FC<Props> = ({ tableDataRef }) => {
	const [tableData, setTableData] = useState(tableDataRef.current);
	const divRef = useRef<HTMLDivElement>(null);

	const saveTable = (data: TableData): void => {
		setTableData(data);
		tableDataRef.current = data;
	};

	// This function doesn't alter the tableData state, you need to call a setTableData with this
	const tableUnselected = (): TableData => {
		if (tableData.columnSelected !== undefined) {
			const newGrid = tableData.grid.map((cArray, cIndex) => {
				if (cIndex === tableData.columnSelected) {
					return cArray.map((cell) => ({ ...cell, isSelected: false }));
				}
				return cArray;
			});
			return { ...tableData, grid: newGrid, columnSelected: undefined };
		}
		return tableData;
	};

	const setCellSelected = (
		table: TableData,
		row: number,
		column: number,
		oneClick: boolean
	): void => {
		if (row === 0 && oneClick) {
			const newGrid = table.grid.map((columnArray, columnIndex) => {
				if (columnIndex === column) {
					return columnArray.map((cell) => ({ ...cell, isSelected: true }));
				}
				return columnArray;
			});
			setTableData({ ...table, grid: newGrid, columnSelected: column });
			return;
		}

		const newGrid = table.grid.map((cArray, columnIndex) => {
			if (columnIndex === column) {
				return cArray.map((cell, rowIndex) => {
					if (rowIndex === row) {
						return { ...cell, isSelected: true };
					}
					return cell;
				});
			}
			return cArray;
		});

		setTableData({ ...table, grid: newGrid, columnSelected: column });
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if ((divRef.current != null) && !divRef.current.contains(event.target as Node)) {
				// User clicked outside the div
				setTableData(tableUnselected());
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [tableData]);

	const addRow = (): void => {
		const grid = tableData.grid.map((columnArray) => [
			...columnArray,
			{ value: '', isSelected: false },
		]);
		const newTableData = { ...tableData, grid };
		tableDataRef.current = newTableData;
		setTableData(newTableData);
	};

	return (
		<div className="table-container" ref={divRef}>
			<div className="table">
				{tableData.grid.map((columnArray, columnIndex) => (
					<ColumnCells key={columnIndex}>
						{columnArray.map((cell, rowIndex) => (
							<TextCell
								key={rowIndex}
								title={cell.value}
								isSelected={cell.isSelected}
								tableData={tableData}
								row={rowIndex}
								column={columnIndex}
								tableUnselected={tableUnselected}
								setSelected={setCellSelected}
								saveTable={saveTable}
								setTableData={setTableData}
							/>
						))}
					</ColumnCells>
				))}
			</div>
			<button className="regular-btn" onClick={addRow}>
				Adicionar linha
			</button>
		</div>
	);
};
