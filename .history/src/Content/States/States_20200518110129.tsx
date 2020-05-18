import { createStyles, Grid, makeStyles, Paper, Theme, Typography, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getDistrictWiseData, getZones } from "../../Api/API_1";
import { PackedCirclesData } from "../../Common/PackedCircles";
import { StateChart } from "../../Common/StateChart";
import STATES from "./StatesList";
import { getCurrentLocation } from "../../services/geocoding";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            backgroundColor: theme.palette.secondary.main,
            borderRadius: 5,
            position: 'relative'
        },
        timestamp: {
            fontSize: 14,
            textAlign: 'right',
            alignSelf: 'flex-end',
            marginBottom: 10,
            [theme.breakpoints.down('md')]: {
                fontSize: 10
            },
            height: 20
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            margin: '5px 0 40px 0'
        },
        headerText: {
            fontFamily: 'Poppins',
            fontSize: 25,
            lineHeight: '17px',
            textAlign: 'left',
            [theme.breakpoints.down('md')]: {
                fontSize: 20
            }
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 250
        },
        stateDropLabel: {
            color: "#fff"
        }
    })
);

const ZONE_COLORS: {[key: string]: string} = {
    "Red": "#BE0032",
    "Green": "#008856",
    "Orange": "#F38400"
};

const STATES_DATA: {[key: string]: {name: string, confirmed: PackedCirclesData[], active: PackedCirclesData[], recovered: PackedCirclesData[], deceased: PackedCirclesData[], zones: PackedCirclesData[]}} = {};

export function States() {
    const classes = useStyles();
    const [lastUpdated, setLastUpdated] = useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState<string>("");
    const [zones, setZones] = useState<PackedCirclesData[]>([]);
    const [confirmed, setConfirmed] = useState<PackedCirclesData[]>([]);
    const [active, setActive] = useState<PackedCirclesData[]>([]);
    const [recovered, setRecovered] = useState<PackedCirclesData[]>([]);
    const [deceased, setDeceased] = useState<PackedCirclesData[]>([]);
    const [selectedState, setSelectedState] = useState("");

    const handleStateChange = (event: React.ChangeEvent<{value: unknown}>) => {
        const val = event.target.value as string;
        setSelectedState(val);
    };

    const setData = (selectedState: string) => {
        if (!STATES_DATA[selectedState]) return;
        const {name, confirmed, active, recovered, deceased, zones} = STATES_DATA[selectedState];
        setName(name);
        setConfirmed(confirmed);
        setActive(active);
        setRecovered(recovered);
        setDeceased(deceased);
        setZones(zones);
    };

    useEffect(() => {
        setData(selectedState);

    }, [selectedState]);

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const [stateData, zonesData] = await Promise.all([getDistrictWiseData(), getZones()]);
                const { zones } = zonesData;
                const districtDataMap = new Map<string, Map<string, {confirmed: number, active: number, deceased: number; recovered: number}>>();
                stateData.forEach(({statecode, districtData}) => {
                    if (!districtDataMap.get(statecode)) {
                        districtDataMap.set(statecode, new Map());
                    }
                    districtData.forEach(({district, confirmed, active, deceased, recovered}) => {
                        districtDataMap.get(statecode)!.set(district, {
                            confirmed,
                            active,
                            deceased,
                            recovered
                        });
                    });
                });

                // set states map
                STATES.forEach(({ state, stateCode }) => {
                    const districts = zones.filter(({ statecode}) => statecode === stateCode);
                    STATES_DATA[stateCode] = {
                        name: state,
                        confirmed: districts.map(({district, zone}) => ({
                            name: district,
                            color: "#F38400",
                            value: districtDataMap.get(stateCode)?.get(district)?.confirmed || 0
                        })),
                        active: districts.map(({district, zone}) => ({
                            name: district,
                            color: "#67B7DC",
                            value: districtDataMap.get(stateCode)?.get(district)?.active || 0
                        })),
                        recovered: districts.map(({district, zone}) => ({
                            name: district,
                            color: "#008856",
                            value: districtDataMap.get(stateCode)?.get(district)?.recovered || 0
                        })),
                        deceased: districts.map(({district, zone}) => ({
                            name: district,
                            color: "#ED7B84",
                            value: districtDataMap.get(stateCode)?.get(district)?.recovered || 0
                        })),
                        zones: districts.map(({district, zone}) => ({
                            name: district,
                            color: ZONE_COLORS[zone],
                            value: 0
                        }))
                    };
                });
            } catch(e) {
                console.error(e);
            }

            // set current state
            let _selectedState = "";
            try {   
                const state = await getCurrentLocation();
                const currentState = STATES.filter(s => s.state === state)[0];
                if (currentState) {
                    _selectedState = currentState.stateCode;
                } else {
                    console.error("not able to resolve state name", state);
                }
            } catch(e) {
                console.error(e);
            } finally {
                setSelectedState(_selectedState || "DL");
                setLoading(false);
            }
            
        })();
        
    }, []);
    return (
        <>
            <Typography variant="h6" className={classes.timestamp}>
                
            </Typography>
            <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <FormControl className={classes.formControl} disabled={loading}>
                            <InputLabel id="state-selector-label" className={classes.stateDropLabel}>State</InputLabel>
                            <Select
                                labelId="state-selector-label"
                                id="state-selector"
                                value={selectedState}
                                onChange={handleStateChange}
                                autoWidth
                            >
                                {
                                    STATES.map(({stateCode, state}) => (
                                        <MenuItem key={stateCode} value={stateCode}>{state}</MenuItem>       
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <StateChart name="Zones" data={zones} loading={loading} indicative />
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <StateChart name="Confirmed cases" color="#F38400" data={confirmed} loading={loading} />
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <StateChart name="Active Cases" color="#67B7DC" data={active} loading={loading} />
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <StateChart name="Recovered" color="#008856" data={recovered} loading={loading} />
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <StateChart name="Deaths" color="#ED7B84" data={deceased} loading={loading} />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}