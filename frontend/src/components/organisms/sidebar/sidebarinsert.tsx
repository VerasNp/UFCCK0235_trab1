import React from 'react';
import Logo from '../../atoms/logo';
import Button from '../../atoms/button';
import Nav from '../../molecules/nav';
import './styles.css';

interface Props {
	onInsertDataClick: React.MouseEventHandler;
}

const Sidebar: React.FC<Props> = ({ onInsertDataClick }) => {
	return (
		<>
			<Nav className="sidebar">
				<Logo />
				<p className="description">
					{' '}
					Surabaia é uma sistema de plotagem de dados estatísticos utilizando
					conhecimentos e padrões aprendidos ao longo da disciplina CK0235 -
					Técnicas de Programação da Universidade Federal do Ceará.
				</p>
				<Button
					name={''}
					disabled={false}
					type={'button'}
					className={'btn'}
					text={'Voltar'}
					onClick={onInsertDataClick}
				/>
			</Nav>
		</>
	);
};

export default Sidebar;
