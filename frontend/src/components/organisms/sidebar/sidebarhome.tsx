import React from 'react';
import Button from '../../atoms/button';
import Header from '../../molecules/header';
import './styles.css';

interface Props {
	onInsertDataClick: React.MouseEventHandler;
}

const SidebarHome: React.FC<Props> = ({ onInsertDataClick }) => {
	return (
		<>
			<div className="sidebar">
				<Header />
				<Button
					name={''}
					disabled={false}
					type={'button'}
					className={'btn'}
					text={'Inserir dados'}
					onClick={onInsertDataClick}
				/>
			</div>
		</>
	);
};

export default SidebarHome;
