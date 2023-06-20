import React, { useEffect, useState } from 'react';
import Navbar from '../../organisms/navbar';
import Home from '../../templates/home';

const Default: React.FC = () => {
	const [state, setState] = useState(0);

	useEffect(() => {
		setState(1);
	}, [state]);

	return (
		<>
			<Navbar />
			{state === 1 ? <Home /> : ''}
		</>
	);
};

export default Default;
