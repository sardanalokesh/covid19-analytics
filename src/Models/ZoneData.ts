export interface ZoneData {
    zones: DistrictZoneData[];
}

interface DistrictZoneData {
    "district": string;
    "districtcode": string;
    "lastupdated": string;
    "source": string;
    "state": string;
    "statecode": string;
    "zone": string;
}