import { statisticCalcs } from 'api/statisticApi/api';
import { type IAnalysis } from 'api/statisticApi/models/IAnalysis';
import { type CellData } from 'components/atoms/cell';
import { ColumnCells } from 'components/atoms/column_cells';
import { FloatCell } from 'components/atoms/float_cell';
import { IntegerCell } from 'components/atoms/int_cell';
import { TextCell } from 'components/atoms/text_cell';
import { ApplicationPage } from 'components/pages/default';
import React, { type MutableRefObject, useState, useRef, useEffect } from 'react';

import './styles.css';

interface DataSheetProps {
	tableDataRef: MutableRefObject<TableData | null>;
	statisticalDataRef: MutableRefObject<IAnalysis | null>;
	setAppState: (state: ApplicationPage) => void;
}

export interface TableData {
	grid: CellData[][];
	types: string[];
	columnSelected?: number;
	rowSelected?: number;
}

export interface ColumnOutputData {
	title: string;
	isNumeric: string;
	data: string[];
}

interface ContextMenuProps {
	xPos: number;
	yPos: number;
	onClose: () => void;
	handleRemoveColumn: () => void;
	handleRemoveRow: () => void;
}
const ContextMenu: React.FC<ContextMenuProps> = ({
	xPos,
	yPos,
	onClose,
	handleRemoveColumn,
	handleRemoveRow,
}) => {
	// Define menu items and their actions
	const menuItems = [
		{
			label: 'Remover coluna',
			action: () => {
				handleRemoveColumn();
			},
		},
		{
			label: 'Remover linha',
			action: () => {
				handleRemoveRow();
			},
		},
	];

	// Handle click on menu item
	const handleItemClick = (action: () => void): void => {
		action();
		onClose();
	};

	return (
		<div
			className="context-menu"
			style={{ position: 'absolute', top: yPos, left: xPos }}
		>
			{menuItems.map((item, index) => (
				<button
					key={index}
					onClick={() => {
						handleItemClick(item.action);
					}}
				>
					{item.label}
				</button>
			))}
		</div>
	);
};

// When the user hit the save button, we update tableDataRef
export const DataSheet: React.FC<DataSheetProps> = ({
	tableDataRef,
	statisticalDataRef,
	setAppState,
}) => {
	const [tableData, setTableData] = useState<TableData | null>(
		tableDataRef.current ?? null
	);
	const divRef = useRef<HTMLDivElement>(null);

	console.log(tableData);

	const [contextMenuPos, setContextMenuPos] = useState({ xPos: 0, yPos: 0 });
	const [showContextMenu, setShowContextMenu] = useState(false);

	const handleContextMenu = (event: React.MouseEvent): void => {
		event.preventDefault();
		const xPos = event.pageX;
		const yPos = event.pageY;
		setContextMenuPos({ xPos, yPos });
		setShowContextMenu(true);
	};

	const closeContextMenu = (): void => {
		setShowContextMenu(false);
	};

	const saveTable = (data: TableData): void => {
		setTableData(data);
		tableDataRef.current = data;
	};

	// This function doesn't alter the tableData state, you need to call a setTableData with this
	const tableUnselected = (): TableData => {
		if (tableData?.columnSelected !== undefined) {
			const newGrid = tableData.grid.map((cArray, cIndex) => {
				if (cIndex === tableData.columnSelected) {
					return cArray.map((cell) => ({ ...cell, isSelected: false }));
				}
				return cArray;
			});
			return {
				...tableData,
				grid: newGrid,
				columnSelected: undefined,
				rowSelected: undefined,
			};
		}
		return tableData ?? { grid: [], types: [] };
	};

	// updates the cells selected
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
			setTableData({
				...table,
				grid: newGrid,
				columnSelected: column,
			});
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

		setTableData({
			...table,
			grid: newGrid,
			columnSelected: column,
			rowSelected: row,
		});
	};

	// When the user click outside the table, all cells selected lose focus
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (
				divRef.current != null &&
				!divRef.current.contains(event.target as Node)
			) {
				if (showContextMenu) {
					setShowContextMenu(false);
					return;
				}
				setTableData(tableUnselected());
			}
		};

		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [tableData, showContextMenu]);

	// Verify if there is a column selected, if so, change the app state and the columnToAnalyzeRef
	const handleCalculateClick = (): void => {
		if (tableData?.columnSelected !== undefined) {
			const selectedCells = tableData.grid[tableData.columnSelected].filter(
				(cell) => cell.value !== '' && cell.isSelected
			);

			if (selectedCells.length === 1) {
				alert(
					'Para realizar a análise, selecione uma coluna com mais de um dado'
				);
				return;
			}

			const title = selectedCells[0].value;
			const data = selectedCells.slice(1).map((cell) => cell.value);

			const form = new FormData();
			form.append('title', title);
			data.forEach((e) => {
				form.append('data[]', e);
			});

			statisticCalcs(form)
				.then((response) => {
					statisticalDataRef.current = response.data;
					setAppState(ApplicationPage.ANALYSIS);
				})
				.catch((errorMsg) => {
					alert(errorMsg);
				});

			return;
		}
		alert('nenhuma célula selecionada ');
	};

	const addRow = (): void => {
		if (tableData === null) {
			return;
		}
		const grid = (tableData?.grid ?? []).map((columnArray) => [
			...columnArray,
			{ value: '', isSelected: false },
		]);
		const types = tableData?.types ?? [];
		const newTableData: TableData = { grid, types };
		tableDataRef.current = newTableData;

		setTableData(newTableData);
	};

	const addColumn = (type: string): void => {
		const len = (tableData?.grid[0] ?? []).length;
		let newColumn: CellData[] = [];

		if (len === 0) {
			newColumn = [{ value: '', isSelected: false }];
		}

		for (let i = 0; i < len; i++) {
			newColumn.push({ value: '', isSelected: false });
		}

		const grid = [...(tableData?.grid ?? []), newColumn];
		const newTableData = {
			...tableData,
			grid,
			types: [...(tableData?.types ?? []), type],
		};
		tableDataRef.current = newTableData;
		setTableData(newTableData);
	};

	const removeColumn = (): void => {
		if (tableData?.columnSelected !== undefined) {
			const grid = tableData.grid.filter(
				(_, index) => index !== tableData.columnSelected
			);
			const types = tableData.types.filter(
				(_, index) => index !== tableData.columnSelected
			);
			const newTableData = {
				...tableData,
				grid,
				types,
			};

			tableDataRef.current = newTableData;
			setTableData(newTableData);
		}
	};

	const removeRow = (): void => {
		if (tableData?.rowSelected !== undefined) {
			const grid = tableData.grid.map((column) => {
				return column.filter((_, index) => index !== tableData.rowSelected);
			});
			const newTableData = {
				...tableData,
				grid,
			};

			tableDataRef.current = newTableData;
			setTableData(newTableData);
		}
	};

	const addStringColumn = (): void => {
		addColumn('string');
	};
	const addIntegerColumn = (): void => {
		addColumn('int');
	};
	const addFloatColumn = (): void => {
		addColumn('float');
	};

	return (
		<div
			className="table-container"
			ref={divRef}
			onContextMenu={handleContextMenu}
		>
			{showContextMenu && (
				<ContextMenu
					xPos={contextMenuPos.xPos}
					yPos={contextMenuPos.yPos}
					handleRemoveColumn={removeColumn}
					handleRemoveRow={removeRow}
					onClose={closeContextMenu}
				/>
			)}
			<div className="table">
				{(tableData == null)
					? 'Insira uma coluna'
					: tableData.grid.map((columnArray, columnIndex) => (
							<ColumnCells key={columnIndex}>
								{columnArray.map((cell, rowIndex) => {
									let widget;
									const key = `${cell.value}-${rowIndex},${columnIndex}`;
									switch (tableData.types[columnIndex]) {
										case 'int':
											widget = (
												<IntegerCell
													key={key}
													title={cell.value}
													isColumnTitle={rowIndex === 0}
													isSelected={cell.isSelected}
													tableData={tableData}
													row={rowIndex}
													column={columnIndex}
													tableUnselected={tableUnselected}
													setSelected={setCellSelected}
													saveTable={saveTable}
												/>
											);
											break;
										case 'float':
											widget = (
												<FloatCell
													key={key}
													title={cell.value}
													isColumnTitle={rowIndex === 0}
													isSelected={cell.isSelected}
													tableData={tableData}
													row={rowIndex}
													column={columnIndex}
													tableUnselected={tableUnselected}
													setSelected={setCellSelected}
													saveTable={saveTable}
												/>
											);
											break;
										default:
											widget = (
												<TextCell
													key={key}
													title={cell.value}
													isColumnTitle={rowIndex === 0}
													isSelected={cell.isSelected}
													tableData={tableData}
													row={rowIndex}
													column={columnIndex}
													tableUnselected={tableUnselected}
													setSelected={setCellSelected}
													saveTable={saveTable}
												/>
											);
											break;
									}
									return widget;
								})}
							</ColumnCells>
					  ))}
			</div>
			<div style={{ display: 'flex', alignSelf: 'start', marginLeft: '5%' }}>
				<button className="regular-btn" onClick={addRow}>
					<img
						style={{ marginRight: 6 }}
						src="icons8-add-24.png"
						alt="Add Row"
					/>
					Add linha
				</button>

				<div className="dropdown">
					<button className="dropbtn">
						<img
							style={{ marginRight: 6 }}
							src="icons8-add-24.png"
							alt="Add Column"
						/>{' '}
						Add coluna
					</button>
					<div className="dropdown-content">
						<button onClick={addStringColumn}>string</button>
						<button onClick={addIntegerColumn}>inteiro</button>
						<button onClick={addFloatColumn}>float</button>
					</div>
				</div>
			</div>
			<button
				id="calc-btn"
				className="regular-btn"
				onClick={handleCalculateClick}
			>
				Calcular{' '}
				<img style={{ marginLeft: 8 }} src="Calculator.svg" alt="Calculator" />
			</button>
		</div>
	);
};
