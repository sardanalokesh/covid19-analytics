import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import NumberFormat from "react-number-format";
import { Chloropeth, ChloropethData } from "../Common/Cholopeth";
import { Loader } from "../Common/Loader";
import { FeatureCollection } from "@amcharts/amcharts4-geodata/.internal/Geodata";

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
    },
    timestamp: {
        fontSize: 14,
        textAlign: 'right',
        alignSelf: 'flex-end',
        [theme.breakpoints.down('md')]: {
            fontSize: 10
        }
    }
  }),
);

interface StateWiseReportProps {
    data: ChloropethData[],
    total?: number;
    name: string;
    color: string;
    loading: boolean;
    lastUpdated: string;
    geoData: FeatureCollection;
}

export function MapReport({ data, total, name, color, loading, lastUpdated, geoData}: StateWiseReportProps) {

    const classes = useStyles();

    return (
        <>
            <div className={classes.header}>
                <Typography variant="h6" className={classes.headerText}>
                    {name} {
                        total !== undefined && (
                            <span>
                                <span>&gt; </span>
                                <span style={{color}}>
                                    <NumberFormat value={total} displayType="text" thousandSeparator={true} />
                                </span>
                            </span>
                        )
                    }
                </Typography>
                {/* <Typography variant="h6" className={classes.timestamp}>
                    { lastUpdated }
                </Typography> */}
            </div>
            <Chloropeth data={data} name={name} color={color} geoData={geoData} />
            <Loader loading={loading} />
        </>
    );
}