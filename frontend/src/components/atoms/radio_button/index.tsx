import './styles.css';
import React from 'react';

interface Props {
	name: string;
	label: string;
	value: number;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const RadioButton: React.FC<Props> = ({ name, label, value, onChange }) => {
	return (
		<>
			<div className={'radio'}>
				<input
					type="radio"
					name={name}
					id={name}
					value={value}
					onChange={onChange}
				/>
				<label htmlFor={name}>{label}</label>
			</div>
		</>
	);
};

export default RadioButton;
