import React from 'react';
import './styles.css';
import Logo from 'components/atoms/logo';

const Header: React.FC = () => {
	return (
		<div className="header">
			<Logo />
			<p className="description">
				{' '}
				Bem vindo ao nosso sistema de calculos estatísticos e plotagem de dados!
			</p>
		</div>
	);
};

export default Header;
