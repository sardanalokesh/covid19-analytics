import axios from 'axios';
import { Country } from '../Models/Country';
import { CountryWiseData } from '../Models/CountryWiseData';
import { WorldSummary } from '../Models/WorldSummary';

const COUNTRIES = "/countries";
const ALL = "/all";
const SUMMARY = "/summary";

export const API_2 = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api2' : 'https://api.covid19api.com'
});

export function getData<T>(url: string): Promise<T> {
    return API_2.get<T>(url).then(res => res.data);
}

export function getCountries(): Promise<Country[]> {
    return getData<Country[]>(COUNTRIES);
}

export function getCountryWiseData(): Promise<CountryWiseData[]> {
    return getData<CountryWiseData[]>(ALL);
}

export function getWorldSummary(): Promise<WorldSummary> {
    return getData<WorldSummary>(SUMMARY);
}