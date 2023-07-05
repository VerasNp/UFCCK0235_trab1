import React from 'react';
import './styles.css';

const Home: React.FC = () => {
	return (
		<div className="text-block">
			<p className="text">
				{' '}
				Surabaia é uma sistema de plotagem de dados estatísticos utilizando
				conhecimentos e padrões aprendidos ao longo da disciplina CK0235 -
				Técnicas de Programação da Universidade Federal do Ceará Ministrada pelo
				professor José Macedo.{' '}
			</p>
			<p className="text">
				{' '}
				O front-end da aplicação foi desenvolvido utilizando o framework de
				JavaScript React.js com o padrão Atomic Design. Para o back-end foi
				utilizado Java com os padrões de projeto MVC e Observer.
			</p>
			<p className="text"> Alunos do grupo do projeto são: </p>
			<p className="text">
				{' '}
				Lucas Braide - 537009 <br /> Bruno Saunders - 537068 <br />
				Denis da Silva - 539198 <br /> Vitor Veras - 520400 <br /> Israel
				Nícolas - 537604{' '}
			</p>
			<p className="text">
				{' '}
				Agradecemos imensamente a atenção, esperamos que goste!
			</p>
		</div>
	);
};

export default Home;
