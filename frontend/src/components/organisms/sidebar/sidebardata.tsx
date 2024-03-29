import React, { type MutableRefObject } from 'react';
import Button from '../../atoms/button';
import Header from '../../molecules/header';
import './styles.css';
import { type TableData } from '../datasheet';

interface Props {
	tableDataRef: MutableRefObject<TableData | null>;
	onVoltarClick: React.MouseEventHandler;
}

const SidebarData: React.FC<Props> = ({ tableDataRef, onVoltarClick }) => {
	const handleExport = (): void => {
		let csv: string = '';
		const output = tableDataRef.current?.grid[0].map((col, i) =>
			tableDataRef.current?.grid.map((row) => row[i])
		);
		if (output === undefined) return;

		output?.forEach((e) => {
			csv +=
				e != null
					? e
							?.map(function ({ value }) {
								return value;
							})
							.join(',') + '\n'
					: '';
		});

		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8,' });
		const objUrl = URL.createObjectURL(blob);
		const tempLink = document.createElement('a');
		tempLink.style.display = 'none';
		tempLink.href = objUrl;
		tempLink.setAttribute('download', 'table.csv');
		if (typeof tempLink.download === 'undefined') {
			tempLink.setAttribute('target', '_blank');
		}
		document.body.appendChild(tempLink);
		tempLink.click();
		document.body.removeChild(tempLink);
		setTimeout(() => {
			window.URL.revokeObjectURL(objUrl);
		}, 100);
	};
	return (
		<>
			<div className="sidebar">
				<Header />
				<Button
					name={''}
					disabled={false}
					type={'button'}
					className={'btn'}
					text={'Exportar'}
					onClick={handleExport}
				/>
				<Button
					name={''}
					disabled={false}
					type={'button'}
					className={'btn'}
					text={'Voltar'}
					onClick={onVoltarClick}
				/>
			</div>
		</>
	);
};

export default SidebarData;
