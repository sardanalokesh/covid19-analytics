import axios from 'axios';

export const API = axios.create({
});

export enum DateRange {
    ALL = "ALL",
    TODAY = "TODAY",
    LAST_7_DAYS = "LAST_7_DAYS"
}

export function getReportData<T>(url: string, countryId: number, dateRange?: DateRange): Promise<T> {
    let body: {countryId: number, dateRange?: string, date?: string;};
    body = {countryId};
    if (dateRange) {
        body = {countryId, dateRange};
    }
    return API.post<T>(url, body).then(res => res.data);
}

export function getData<T>(url: string): Promise<T> {
    return API.get<T>(url).then(res => res.data);
}