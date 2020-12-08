import { createStyles, Grid, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getStateWiseData } from "../Api/API_1";
import { ChloropethData } from "../Common/Cholopeth";
import { MapReport } from "./MapReport";
import geoData from "@amcharts/amcharts4-geodata/india2019Low";

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

function Today() {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string>("");
    const [confirmedCases, setConfirmedCases] = useState<ChloropethData[]>([]);
    const [totalConfirmedCases, setTotalConfirmedCases] = useState<number>(0);
    const [deaths, setDeaths] = useState<ChloropethData[]>([]);
    const [totalDeaths, setTotalDeaths] = useState<number>(0);
    const [recovered, setRecovered] = useState<ChloropethData[]>([]);
    const [totalRecovered, setTotalRecovered] = useState<number>(0);

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        getStateWiseData().then(data => {
            if (mounted) {
                setLoading(false);
                const { statewise } = data;
                setLastUpdated(statewise[0].lastupdatedtime);
                const _confirmedCases: any[] = [], _deaths: any[] = [], _recovered: any[] = [];
                let _totalConfirmedCases = 0, _totalDeaths = 0, _totalRecovered = 0;
                statewise.forEach(({ statecode, deltaconfirmed: confirmed, deltadeaths: deaths, deltarecovered: recovered}) => {
                    if (statecode === "LA") statecode = "LK"; // paatching Ladakh
                    if(statecode === "TT") {
                        _totalConfirmedCases = parseInt(confirmed);
                        _totalDeaths = parseInt(deaths);
                        _totalRecovered = parseInt(recovered);
                        return;
                    }
                    const __confirmed = parseInt(confirmed), __deaths = parseInt(deaths), __recovered = parseInt(recovered);
                    _confirmedCases.push({id: `IN-${statecode}`, value: __confirmed});
                    _deaths.push({id: `IN-${statecode}`, value: __deaths});
                    _recovered.push({id: `IN-${statecode}`, value: __recovered});
                });
                
                setConfirmedCases(_confirmedCases);
                setTotalConfirmedCases(_totalConfirmedCases);
                
                setDeaths(_deaths);
                setTotalDeaths(_totalDeaths);
                
                setRecovered(_recovered);
                setTotalRecovered(_totalRecovered);
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
                <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
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
                <Grid item md={6} xs={12}>
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
            </Grid>
        </>
    );
}

export default Today;