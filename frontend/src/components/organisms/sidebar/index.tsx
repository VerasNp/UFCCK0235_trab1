import React from 'react';
import Logo from '../../atoms/logo';
import Button from '../../atoms/button';
import Nav from '../../molecules/nav';

interface Props {
	onInsertDataClick: React.MouseEventHandler;
}

const Sidebar: React.FC<Props> = ({ onInsertDataClick }) => {
	return (
		<>
			<Nav className="navbar">
				<Logo />
				<p>
					Lorem ipsum is placeholder text commonly used in the graphic, print,
					and publishing industries for previewing layouts and visual mockups
				</p>
				<Button
					name={''}
					disabled={false}
					type={'button'}
					className={'btn'}
					text={'Inserir dados'}
					onClick={onInsertDataClick}
				/>
			</Nav>
		</>
	);
};

export default Sidebar;
