import React from 'react';
import './styles.css';
import Snackbar from 'components/molecules/snackbar';

interface Props {
	onInsertManuallyClick: React.MouseEventHandler;
	onInsertSendFileClick: React.MouseEventHandler;
}

const InsertData: React.FC<Props> = ({
	onInsertManuallyClick,
	onInsertSendFileClick,
}) => {
	return (
		<Snackbar
			onInsertManuallyClick={onInsertManuallyClick}
			onInsertSendFileClick={onInsertSendFileClick}
		/>
	);
};

export default InsertData;
