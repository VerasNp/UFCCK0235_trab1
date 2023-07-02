import React from 'react';
import './styles.css';
import Snackbar from 'components/molecules/snackbar';

interface Props {
	onInsertManuallyClick: React.MouseEventHandler;
}

const InsertData: React.FC<Props> = ({ onInsertManuallyClick }) => {
	return <Snackbar onInsertManuallyClick={onInsertManuallyClick}></Snackbar>;
};

export default InsertData;
