import axios, { type Axios, type AxiosResponse } from 'axios';
import { type IAnalysis } from './models/IAnalysis';

export const statisticApi: Axios = axios.create({
	baseURL: '',
});

export const statisticCalcs = async (): Promise<AxiosResponse<IAnalysis>> => {
	return await statisticApi.post<IAnalysis>('/api/statistic');
};
