export interface CountryWiseData {
    "updated": number;
    "country": string;
    "countryInfo": CountryInfo;
    "cases": number;
    "todayCases": number;
    "deaths": number;
    "todayDeaths": number;
    "recovered": number;
    "active": number;
    "critical": number;
    "casesPerOneMillion": number;
    "deathsPerOneMillion": number;
    "tests": number;
    "testsPerOneMillion": number;
    "continent": string;
}

export interface CountryInfo {
    "_id": number;
    "iso2": string;
    "iso3": string;
    "lat": number;
    "long": number;
    "flag": string;
}