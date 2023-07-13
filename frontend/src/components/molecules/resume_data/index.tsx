import React from 'react';
import './styles.css';

interface Props {
	title: string;
	value: string | number;
}

const ResumeData: React.FC<Props> = ({ title, value }) => {
	return (
		<>
			<div className={'resume-box box-blue'}>
				<div className={'resume-box-title'}>
					<span>{title}</span>
				</div>
				<div className={'resume-box-content box-white'}>
					<span>{value}</span>
				</div>
			</div>
		</>
	);
};

export default ResumeData;
