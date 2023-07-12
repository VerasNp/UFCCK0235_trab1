import React, { type MutableRefObject } from 'react';
import './styles.css';
import CSVUploader from 'components/molecules/uploadfile';
import { type ApplicationPage } from '../../pages/default';
import { type TableData } from '../../organisms/datasheet';

interface Props {
	tableDataRef: MutableRefObject<TableData>;
	setAppState: (state: ApplicationPage) => void;
}

const SelectFile: React.FC<Props> = ({ tableDataRef, setAppState }) => {
	return <CSVUploader tableDataRef={tableDataRef} setAppState={setAppState} />;
};

export default SelectFile;
