import './styles.css';
import React from 'react';

export interface ColumnCellsProps {
	children: React.ReactNode;
}

export const ColumnCells: React.FC<ColumnCellsProps> = ({ children }) => {
	return <div className="column-cells">{children}</div>;
};
