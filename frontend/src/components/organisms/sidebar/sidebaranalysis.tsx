import React from 'react';
import Button from '../../atoms/button';
import Header from '../../molecules/header';
import './styles.css';

interface Props {
	onVoltarClick: React.MouseEventHandler;
	onVoltar2Click: React.MouseEventHandler;
}

const SidebarAnalysis: React.FC<Props> = ({
	onVoltarClick,
	onVoltar2Click,
}) => {
	return (
		<>
			<div className="sidebar">
				<Header />
				<Button
					name={''}
					disabled={false}
					type={'button'}
					className={'btn'}
					text={'Voltar'}
					onClick={onVoltar2Click}
				/>
				<Button
					name={''}
					disabled={false}
					type={'button'}
					className={'btn'}
					text={'Voltar Para o início'}
					onClick={onVoltarClick}
				/>
			</div>
		</>
	);
};

export default SidebarAnalysis;
