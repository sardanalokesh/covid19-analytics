import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { ColumnChart, ColumnChartData } from "./ColumnChart";
import NumberFormat from 'react-number-format';
import { TimeUnit } from "@amcharts/amcharts4/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
        fontFamily: 'Poppins',
        fontSize: 25,
        lineHeight: '17px',
        textAlign: 'left',
        margin: '5px 0 40px 0',
        [theme.breakpoints.down('md')]: {
            fontSize: 20
        }
    },
    subheader: {
        fontSize: 20,
        [theme.breakpoints.down('md')]: {
            fontSize: 15
        }
    }
  }),
);

export interface TimeSeriesData {
    time: number;
    value: number;
}

interface MetricChartProps {
    name: string;
    color: string;
    data: TimeSeriesData[],
    baseInterval?: {
        timeUnit: TimeUnit;
        count: number;
    };
    subheader?: boolean;
}

export function MetricChart({name, color, data = [], baseInterval, subheader }: MetricChartProps) {
    const classes = useStyles();
    const [chartData, setChartData] = useState<ColumnChartData[]>([]);
    const sum = data.reduce((a,d) => {
        return d.value + a;
    }, 0);

    useEffect(() => {
        setChartData(data.map(d => {
            return {
                time: new Date(d.time),
                value: d.value
            };
        }));
    }, [data]);

    return (
        <>
        <Typography variant="h6" className={classes.header + (subheader ? ' ' + classes.subheader : '')}>
            {name} &gt; <span style={{color}}>
                <NumberFormat value={sum} displayType="text" thousandSeparator={true} />
            </span>
        </Typography>
        <ColumnChart name={name} color={color} data={chartData} baseInterval={baseInterval} /> 
        </>
    );
}