import React, { useState } from 'react';
import './styles.css';

import Button from 'components/atoms/button';
import { uploadFile } from '../../../api/statisticApi/api';

interface File {
	name: string;
	blob: Blob;
}

const CSVUploader: React.FC = () => {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

	const fetchFile = async (file: any): Promise<void> => {
		await uploadFile(file);
	};

	const handleUpload = (): void => {
		if (selectedFile == null) {
			console.log('no file');
			return;
		}
		const formData = new FormData();
		formData.append('file', selectedFile?.blob);
		fetchFile(formData)
			.then((data) => {
				console.log(data);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	return (
		<div className="upload-box">
			<div className="upload-card">
				<input
					className="input"
					type="file"
					accept=".csv,.xml,.doc,.pdf"
					onChange={handleFileChange}
				/>
				<Button
					className="btn-input"
					text="Inserir Arquivo .csv"
					type="button"
					name={''}
					disabled={false}
				/>
			</div>
			{selectedFile != null && (
				<div className="selected-file">
					<h3> Arquivo selecionado: </h3>
					<p>Selected File: {selectedFile.name}</p>
					<Button
						className="btn-snackbar"
						text="Visualizar dados →"
						type="button"
						name={''}
						disabled={false}
						onClick={handleUpload}
					/>
				</div>
			)}
		</div>
	);
};

export default CSVUploader;
