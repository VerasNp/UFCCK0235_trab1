import React from 'react';
import './styles.css';

interface Props {
	children: React.ReactNode;
	className: string;
}

const Nav: React.FC<Props> = ({ className, children }) => {
	return (
		<>
			<nav className={className}>{children}</nav>
		</>
	);
};

export default Nav;
