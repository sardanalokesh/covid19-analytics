
export interface WorldSummary {
    Global: GlobalSummary,
    Countries: CountrySummary[]
}

export interface GlobalSummary {
    "NewConfirmed": number;
    "TotalConfirmed": number;
    "NewDeaths": number;
    "TotalDeaths": number;
    "NewRecovered": number;
    "TotalRecovered": number;
}

export interface CountrySummary {
    "Country": string;
    "CountryCode": string;
    "Slug": string;
    "NewConfirmed": number; 
    "TotalConfirmed": number;
    "NewDeaths": number;
    "TotalDeaths": number;
    "NewRecovered": number;
    "TotalRecovered": number;
    "Date": string;
}