import axios from 'axios';
import { CountryWiseData } from '../Models/CountryWiseData2';

const COUNTRIES = "/countries";

export const API_3 = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api3' : 'https://corona.lmao.ninja/v2'
});

export function getData<T>(url: string): Promise<T> {
    return API_3.get<T>(url).then(res => res.data);
}

export function getCountryWiseData(): Promise<CountryWiseData[]> {
    return getData<CountryWiseData[]>(COUNTRIES);
}