import React from 'react';
import './styles.css';
import Button from 'components/atoms/button';

interface Props {
	onInsertManuallyClick: React.MouseEventHandler;
	onInsertSendFileClick: React.MouseEventHandler;
}

const Snackbar: React.FC<Props> = ({
	onInsertManuallyClick,
	onInsertSendFileClick,
}) => {
	return (
		<div className="bar">
			<p className="question">
				{' '}
				Deseja inserir os dados para análise de que forma?{' '}
			</p>
			<div className="buttons">
				<Button
					name={''}
					disabled={false}
					type={'button'}
					className={'btn-snackbar'}
					text={'Manualmente'}
					onClick={onInsertManuallyClick}
				/>
				<Button
					name={''}
					disabled={false}
					type={'button'}
					className={'btn-snackbar'}
					text={'Inserir Arquivo'}
					onClick={onInsertSendFileClick}
				/>
			</div>
		</div>
	);
};

export default Snackbar;
