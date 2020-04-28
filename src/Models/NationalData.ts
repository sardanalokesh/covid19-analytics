export interface NationalData {
    "cases_time_series": TimeSeriesData[];
    "statewise": StateData[],
    "tested": []
}

export interface TimeSeriesData {
    "dailyconfirmed": string;
    "dailydeceased": string;
    "dailyrecovered": string;
    "date": string;
    "totalconfirmed": string;
    "totaldeceased": string;
    "totalrecovered": string;
}

export interface StateData {
    "active": string;
    "confirmed": string;
    "deaths": string;
    "deltaconfirmed": string;
    "deltadeaths": string;
    "deltarecovered": string;
    "lastupdatedtime": string;
    "recovered": string;
    "state": string;
    "statecode": string;
    "statenotes": string;
}

export interface TestedData {
    "individualstestedperconfirmedcase": string;
    "positivecasesfromsamplesreported": string;
    "samplereportedtoday": string;
    "source": string;
    "testpositivityrate": string;
    "testsconductedbyprivatelabs": string;
    "testsperconfirmedcase": string;
    "totalindividualstested": string;
    "totalpositivecases": string;
    "totalsamplestested": string;
    "updatetimestamp": string;
}