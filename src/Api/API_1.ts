import axios from 'axios';
import { NationalData } from '../Models/NationalData';

const NATIONAL_DATA = '/data.json';

export const API_1 = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api1' : 'https://api.covid19india.org'
});

export function getData<T>(url: string): Promise<T> {
    return API_1.get<T>(url).then(res => res.data);
}

export function getStateWiseData(): Promise<NationalData> {
    return getData<NationalData>(NATIONAL_DATA);
}