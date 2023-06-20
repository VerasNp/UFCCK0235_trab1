import React from 'react';
import Logo from '../../atoms/logo';
import Button from '../../atoms/button';
import Nav from '../../molecules/nav';

const Navbar: React.FC = () => {
	return (
		<>
			<div>
				<Logo />
				<p>
					Lorem ipsum is placeholder text commonly used in the graphic, print,
					and publishing industries for previewing layouts and visual mockups
				</p>
			</div>
			<Nav>
				<Button
					name={''}
					disabled={false}
					type={'button'}
					className={'btn'}
					text={'Inserir dados'}
				/>
			</Nav>
		</>
	);
};

export default Navbar;
