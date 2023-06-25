import './styles.css';
import React from 'react';

interface Props {
	name: string;
	label: string;
}

const RadioButton: React.FC<Props> = ({ name, label }) => {
	return (
		<>
			<input type="radio" name={name} id={name} />
			<label htmlFor={label}></label>
		</>
	);
};

export default RadioButton;
