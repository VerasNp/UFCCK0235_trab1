import React from 'react';
import Button from '../../atoms/button';
import Header from '../../molecules/header';
import './styles.css';

interface Props {
	onVoltarClick: React.MouseEventHandler;
}

const SidebarData: React.FC<Props> = ({ onVoltarClick }) => {
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
				/>
				<Button
					name={''}
					disabled={false}
					type={'button'}
					className={'btn'}
					text={'Salvar'}
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
