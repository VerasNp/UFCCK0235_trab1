import React from 'react';
import './styles.css';

interface Props {
	type: React.ButtonHTMLAttributes<string>['type'];
	className: string;
	name: string;
	text: string;
	disabled: boolean;
}

const Button: React.FC<Props> = ({
	type,
	className,
	name,
	text,
	disabled,
}): React.ReactElement => {
	return (
		<>
			<button type={type} className={className} name={name} disabled={disabled}>
				{text}
			</button>
		</>
	);
};

Button.defaultProps = {
	type: 'button',
	className: '',
	name: '',
	disabled: false,
};

export default Button;
