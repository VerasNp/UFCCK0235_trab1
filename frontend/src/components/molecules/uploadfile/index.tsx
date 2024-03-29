import React, { type MutableRefObject, useState, useRef } from 'react';
import './styles.css';

import Button from 'components/atoms/button';
import { uploadFile } from '../../../api/statisticApi/api';
import { type TableData } from '../../organisms/datasheet';
import { obtainTableData } from '../../../utils/io';
import { ApplicationPage } from '../../pages/default';

interface File {
	name: string;
	blob: Blob;
}

interface Props {
	tableDataRef: MutableRefObject<TableData | null>;
	setAppState: (state: ApplicationPage) => void;
}

const CSVUploader: React.FC<Props> = ({ tableDataRef, setAppState }) => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const activateFileInput = (): void => {
		fileInputRef?.current?.click();
	};
	const handleFileChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		const file = event.target.files?.[0];
		if (file != null) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setSelectedFile({ name: file.name, blob: file });
			};
			reader.readAsText(file);
		}
	};

	const fetchFile = async (file: any): Promise<any> => {
		return await uploadFile(file);
	};

	const handleUpload = (): void => {
		setLoading(true);
		if (selectedFile == null) {
			console.log('no file');
			return;
		}
		const formData = new FormData();
		formData.append('file', selectedFile?.blob);
		fetchFile(formData)
			.then((data) => {
				if (tableDataRef !== null)
					tableDataRef.current = obtainTableData(data.data);
			})
			.then(() => {
				setAppState(ApplicationPage.DISPLAY_TABLE);
			})
			.catch((e) => {
				console.log(e);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="upload-box">
			<div className="upload-card">
				<input
					className="input"
					type="file"
					ref={fileInputRef}
					accept=".csv,.xml,.doc,.pdf"
					onChange={handleFileChange}
				/>
				<Button
					className="btn"
					text="Inserir Arquivo .csv"
					type="button"
					name={''}
					onClick={activateFileInput}
					disabled={false}
				/>
			</div>
			{selectedFile != null && (
				<div className="selected-file">
					<h3> Arquivo selecionado: </h3>
					<p>Selected File: {selectedFile.name}</p>
					<Button
						className={loading ? 'btn-loading' : 'btn-snackbar'}
						text="Visualizar dados →"
						type="button"
						name={''}
						disabled={loading}
						onClick={handleUpload}
					/>
				</div>
			)}
			<div className={'upload-advice'}>
				<p>
					Obs.: Nosso sistema trabalha atualmente apenas com arquivos .csv, os
					quais os itens devem estar separados utilizando o caractere
					&quot;,&quot; (vírgula), caso contrário podem haver inconsistencias no
					processamento!
				</p>
			</div>
		</div>
	);
};

export default CSVUploader;
