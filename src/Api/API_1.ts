import axios from 'axios';
import { NationalData } from '../Models/NationalData';
import { DistrictData } from '../Models/DistrictData';
import { ZoneData } from '../Models/ZoneData';

const NATIONAL_DATA = '/data.json';
const DISTRICT_DATA = '/v2/state_district_wise.json';
const ZONES = '/zones.json';

export const API_1 = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api1' : 'https://api.covid19india.org'
});

export function getData<T>(url: string): Promise<T> {
    return API_1.get<T>(url).then(res => res.data);
}

export function getStateWiseData(): Promise<NationalData> {
    return getData<NationalData>(NATIONAL_DATA);
}

export function getDistrictWiseData(): Promise<DistrictData[]> {
    return getData<DistrictData[]>(DISTRICT_DATA);
}

export function getZones(): Promise<ZoneData> {
    return getData<ZoneData>(ZONES);
}