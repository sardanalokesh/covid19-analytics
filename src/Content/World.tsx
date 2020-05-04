import { FeatureCollection } from "@amcharts/amcharts4-geodata/.internal/Geodata";
import worldGeoData from "@amcharts/amcharts4-geodata/worldLow";
import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import moment from 'moment';
import React, { useEffect, useState } from "react";
import { getCountryWiseData } from "../Api/API_3";
import { ChloropethData } from "../Common/Cholopeth";
import { MapReport } from "./MapReport";

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
        }
    })
);

export function World() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [geoData] = useState<FeatureCollection>(worldGeoData);
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
    const [tests, setTests] = useState<ChloropethData[]>([]);
    const [totalTests, setTotalTests] = useState<number>(0);
    const [testsPerOneMillion, setTestsPerOneMillion] = useState<ChloropethData[]>([]);
    const [casesPerTests, setCasesPerTests] = useState<ChloropethData[]>([]);
    const [totalCasesPerTests, setTotalCasesPerTests] = useState<number>(0);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        getCountryWiseData().then(countries => {
            if (mounted) {
                setLoading(false);
                setLastUpdated(moment(countries[0].updated).format("DD/MM/YYYY HH:mm:ss"));
                const _confirmedCases: any[] = [], _activeCases: any[] = [], _deaths: any[] = [], _recovered: any[] = [], 
                _recoveryRate: any[] = [], _deathRate: any[] = [], _tests: any[] = [], _testsPerMillion: any[] = [],
                _casesPerTests: any[] = [];
                let _totalConfirmedCases = 0, _totalActiveCases = 0, _totalDeaths = 0, _totalRecovered = 0, 
                _totalRecoveryRate = 0, _totalDeathRate = 0, _totalTests = 0, _totalCasesPerTests = 0;

                // set country level data
                countries.forEach(({ countryInfo, cases, deaths, recovered, tests, testsPerOneMillion }) => {
                    const __confirmed = cases, __active = cases - deaths - recovered, __deaths = deaths, 
                    __recovered = recovered, __tests = tests, __testsPerMillion = testsPerOneMillion,
                    __casesPerTests =  __tests ? Math.round(__confirmed * 10000 / __tests) : 0;
                    const __recoveryRate = __confirmed ? Math.round((__recovered / __confirmed) * 10000) / 100 : 0;
                    const __deathRate = __confirmed ? Math.round((__deaths / __confirmed) * 10000) / 100 : 0;
                    _confirmedCases.push({id: countryInfo.iso2, value: __confirmed});
                    _activeCases.push({id: countryInfo.iso2, value: __active});
                    _deaths.push({id: countryInfo.iso2, value: __deaths});
                    _recovered.push({id: countryInfo.iso2, value: __recovered});
                    _recoveryRate.push({id: countryInfo.iso2, value: __recoveryRate});
                    _deathRate.push({id: countryInfo.iso2, value: __deathRate});
                    _tests.push({id: countryInfo.iso2, value: __tests});
                    _testsPerMillion.push({id: countryInfo.iso2, value: __testsPerMillion});
                    _casesPerTests.push({id: countryInfo.iso2, value: __casesPerTests});
                    _totalConfirmedCases += __confirmed;
                    _totalDeaths += __deaths;
                    _totalRecovered += __recovered;
                    _totalActiveCases += __confirmed - __deaths - __recovered;
                    _totalTests += __tests;
                });

                _totalRecoveryRate = Math.round((_totalRecovered / _totalConfirmedCases) * 10000) / 100;
                _totalDeathRate = Math.round((_totalDeaths / _totalConfirmedCases) * 10000) / 100;
                _totalCasesPerTests = _totalTests ? Math.round(_totalConfirmedCases * 10000 / _totalTests) : 0;
                
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

                setTests(_tests);
                setTotalTests(_totalTests);

                setTestsPerOneMillion(_testsPerMillion);

                setCasesPerTests(_casesPerTests);
                setTotalCasesPerTests(_totalCasesPerTests);
            }
        }, error => {
            console.log("[Overall]", error);
        });

        return () => {mounted = false};
    }, []);

    useEffect(() => {
    }, []);


    return (
        <>
            <Typography variant="h6" className={classes.timestamp}>
                Last Updated: {lastUpdated}
            </Typography>
            <Grid container spacing={3}>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <MapReport
                            data={confirmedCases}
                            total={totalConfirmedCases}
                            name="Confirmed Cases"
                            color="#F38400"
                            loading={loading}
                            lastUpdated={lastUpdated}
                            geoData={geoData}
                        />
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <MapReport
                            data={casesPerTests}
                            total={totalCasesPerTests}
                            name="Confirmed cases per 10k tests"
                            color="#F38400"
                            loading={loading}
                            lastUpdated={lastUpdated}
                            geoData={geoData}
                        />
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <MapReport
                            data={activeCases}
                            total={totalActiveCases}
                            name="Active Cases"
                            color="#67B7DC"
                            loading={loading}
                            lastUpdated={lastUpdated}
                            geoData={geoData}
                        />
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <MapReport
                            data={recovered}
                            total={totalRecovered}
                            name="Recovered"
                            color="#008856"
                            loading={loading}
                            lastUpdated={lastUpdated}
                            geoData={geoData}
                        />
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <MapReport
                            data={deaths}
                            total={totalDeaths}
                            name="Deaths"
                            color="#ED7B84"
                            loading={loading}
                            lastUpdated={lastUpdated}
                            geoData={geoData}
                        />
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <MapReport
                            data={recoveryRate}
                            total={totalRecoveryRate}
                            name="Recovery Rate (%)"
                            color="#00A9F4"
                            loading={loading}
                            lastUpdated={lastUpdated}
                            geoData={geoData}
                        />
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <MapReport
                            data={deathRate}
                            total={totalDeathRate}
                            name="Death Rate (%)"
                            color="#C867DC"
                            loading={loading}
                            lastUpdated={lastUpdated}
                            geoData={geoData}
                        />
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <MapReport
                            data={tests}
                            total={totalTests}
                            name="Total tests conducted"
                            color="#00BCD4"
                            loading={loading}
                            lastUpdated={lastUpdated}
                            geoData={geoData}
                        />
                    </Paper>
                </Grid>
                <Grid item md={12} xs={12}>
                    <Paper className={classes.paper}>
                        <MapReport
                            data={testsPerOneMillion}
                            name="Total tests per million of population"
                            color="#008856"
                            loading={loading}
                            lastUpdated={lastUpdated}
                            geoData={geoData}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}