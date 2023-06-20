import React from 'react';

interface Props {
	children: React.ReactNode;
}

const Nav: React.FC<Props> = ({ children }) => {
	return (
		<>
			<nav>{children}</nav>
		</>
	);
};

export default Nav;
