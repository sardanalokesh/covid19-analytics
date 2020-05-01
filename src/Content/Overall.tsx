import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { StateWiseReport } from "./StateWiseCases";
import { ChloropethData } from "../Common/Cholopeth";
import { getData } from "../Api/API";
import { NationalData } from "../Models/NationalData";
import { ApiList } from "../Api/ApiList";
import { Summary } from "./Summary";

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
            }
        }
    })
);

export function Overall() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string>("");
    const [confirmedCases, setConfirmedCases] = useState<ChloropethData[]>([]);
    const [totalConfirmedCases, setTotalConfirmedCases] = useState<number>(0);
    const [activeCases, setActiveCases] = useState<ChloropethData[]>([]);
    const [totalActiveCases, setTotalActiveCases] = useState<number>(0);
    const [deaths, setDeaths] = useState<ChloropethData[]>([]);
    const [totalDeaths, setTotalDeaths] = useState<number>(0);
    const [recovered, setRecovered] = useState<ChloropethData[]>([]);
    const [totalRecovered, setTotalRecovered] = useState<number>(0);
    const [recoveryRate, setRecoveryRate] = useState<ChloropethData[]>([]);
    const [totalRecoveryRate, setTotalRecovereryRate] = useState<number>(0);
    const [deathRate, setDeathRate] = useState<ChloropethData[]>([]);
    const [totalDeathRate, setTotalDeathRate] = useState<number>(0);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        getData<NationalData>(ApiList.NATIONAL_DATA).then(data => {
            if (mounted) {
                setLoading(false);
                const { statewise } = data;
                setLastUpdated(statewise[0].lastupdatedtime);
                const _confirmedCases: any[] = [], _activeCases: any[] = [], _deaths: any[] = [], _recovered: any[] = [], _recoveryRate: any[] = [], _deathRate: any[] = [];
                let _totalConfirmedCases = 0, _totalActiveCases = 0, _totalDeaths = 0, _totalRecovered = 0, _totalRecoveryRate = 0, _totalDeathRate = 0;
                statewise.forEach(({ statecode, confirmed, active, deaths, recovered}) => {
                    if (statecode === "LA") statecode = "LK"; // paatching Ladakh
                    if(statecode === "TT") {
                        _totalConfirmedCases = parseInt(confirmed);
                        _totalActiveCases = parseInt(active);
                        _totalDeaths = parseInt(deaths);
                        _totalRecovered = parseInt(recovered);
                        _totalRecoveryRate = Math.round((_totalRecovered / _totalConfirmedCases) * 10000) / 100;
                        _totalDeathRate = Math.round((_totalDeaths / _totalConfirmedCases) * 10000) / 100;
                        return;
                    }
                    const __confirmed = parseInt(confirmed), __active = parseInt(active), __deaths = parseInt(deaths), __recovered = parseInt(recovered);
                    const __recoveryRate = __confirmed ? Math.round((__recovered / __confirmed) * 10000) / 100 : 0;
                    const __deathRate = __confirmed ? Math.round((__deaths / __confirmed) * 10000) / 100 : 0;
                    _confirmedCases.push({id: `IN-${statecode}`, value: __confirmed});
                    _activeCases.push({id: `IN-${statecode}`, value: __active});
                    _deaths.push({id: `IN-${statecode}`, value: __deaths});
                    _recovered.push({id: `IN-${statecode}`, value: __recovered});
                    _recoveryRate.push({id: `IN-${statecode}`, value: __recoveryRate});
                    _deathRate.push({id: `IN-${statecode}`, value: __deathRate});
                });
                
                setConfirmedCases(_confirmedCases);
                setTotalConfirmedCases(_totalConfirmedCases);

                setActiveCases(_activeCases);
                setTotalActiveCases(_totalActiveCases);
                
                setDeaths(_deaths);
                setTotalDeaths(_totalDeaths);
                
                setRecovered(_recovered);
                setTotalRecovered(_totalRecovered);

                setRecoveryRate(_recoveryRate);
                setTotalRecovereryRate(_totalRecoveryRate);

                setDeathRate(_deathRate);
                setTotalDeathRate(_totalDeathRate);
            }
        }, error => {
            console.log("[Overall]", error);
        });

        return () => {mounted = false};
    }, []);
    
    return (
        <>
            <Typography variant="h6" className={classes.timestamp}>
                Last Updated: {lastUpdated}
            </Typography>
            <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <Summary
                            active={totalActiveCases}
                            recovered={totalRecovered}
                            deaths={totalDeaths}
                            loading={loading}
                        />
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper className={classes.paper}>
                        <StateWiseReport
                            data={confirmedCases}
                            total={totalConfirmedCases}
                            name="Confirmed Cases"
                            color="#F38400"
                            loading={loading}
                            lastUpdated={lastUpdated}
                        />
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper className={classes.paper}>
                        <StateWiseReport
                            data={activeCases}
                            total={totalActiveCases}
                            name="Active Cases"
                            color="#67B7DC"
                            loading={loading}
                            lastUpdated={lastUpdated}
                        />
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper className={classes.paper}>
                        <StateWiseReport
                            data={recovered}
                            total={totalRecovered}
                            name="Recovered"
                            color="#008856"
                            loading={loading}
                            lastUpdated={lastUpdated}
                        />
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper className={classes.paper}>
                        <StateWiseReport
                            data={deaths}
                            total={totalDeaths}
                            name="Deaths"
                            color="#ED7B84"
                            loading={loading}
                            lastUpdated={lastUpdated}
                        />
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper className={classes.paper}>
                        <StateWiseReport
                            data={recoveryRate}
                            total={totalRecoveryRate}
                            name="Recovery Rate (%)"
                            color="#00A9F4"
                            loading={loading}
                            lastUpdated={lastUpdated}
                        />
                    </Paper>
                </Grid>
                <Grid item md={6} xs={12}>
                    <Paper className={classes.paper}>
                        <StateWiseReport
                            data={deathRate}
                            total={totalDeathRate}
                            name="Death Rate (%)"
                            color="#C867DC"
                            loading={loading}
                            lastUpdated={lastUpdated}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}