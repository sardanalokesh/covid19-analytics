export interface DistrictData {
    "state": string;
    "statecode": string;
    "districtData": District[];
}

interface District {
    "district": string;
    "notes": string;
    "active": number;
    "confirmed": number;
    "deceased": number;
    "recovered": number;
    "delta": Delta;
}

interface Delta {
    "confirmed": number;
    "deceased": number;
    "recovered": number;
}