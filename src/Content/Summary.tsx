import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { Donut } from "../Common/Donut";
import { Loader } from "../Common/Loader";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  }),
);

interface SummaryProps {
    confirmed: number;
    active: number;
    recovered: number;
    deaths: number;
    loading: boolean;
}

export function Summary({ confirmed, active, recovered, deaths, loading}: SummaryProps) {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h6" className={classes.headerText}>
                Overview
            </Typography>
            <Donut name="overall-summary"
                total={confirmed}
                data={[
                    {
                        name: "Active Cases",
                        count: active,
                        color: "#67B7DC"
                    }, {
                        name: "Recovered",
                        count: recovered,
                        color: "#008856"
                    }, {
                        name: "Deaths",
                        count: deaths,
                        color: "#ED7B84"
                    }
                ]} 
            />
            <Loader loading={loading} />
        </>
    );
}