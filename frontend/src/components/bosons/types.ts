export interface AnalysisData {
	title: string;
	isNumeric: boolean;
	data: string[];
	analysisCalcs: AnalysisCalc[];
}

export interface AnalysisCalc {
	title: string;
	value: number;
}
