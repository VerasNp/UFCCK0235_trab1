import axios, { type Axios, type AxiosResponse } from 'axios';
import { type IAnalysis } from './models/IAnalysis';

export const statisticApi: Axios = axios.create({
	baseURL: 'http://localhost:8081',
});

export const statisticCalcs = async (
	column: FormData
): Promise<AxiosResponse<IAnalysis>> => {
	return await statisticApi.post<IAnalysis>('/api/statistic', column);
};

export const uploadFile = async (file: any): Promise<AxiosResponse<any>> => {
	return await statisticApi.post<any>('/api/upload/csv', file);
};
