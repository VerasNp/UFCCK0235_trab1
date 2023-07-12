import React from 'react';
import './styles.css';
import CSVUploader from 'components/molecules/uploadfile';
import { type ApplicationPage } from '../../pages/default';

interface Props {
	setAppState: (state: ApplicationPage) => void;
}

const SelectFile: React.FC<Props> = ({ setAppState }) => {
	return <CSVUploader setAppState={setAppState} />;
};

export default SelectFile;
