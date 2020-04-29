import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import NumberFormat from "react-number-format";
import { Chloropeth, ChloropethData } from "../Common/Cholopeth";
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
    total: number;
    name: string;
    color: string;
    loading: boolean;
    lastUpdated: string;
}

export function StateWiseReport({ data, total, name, color, loading, lastUpdated}: StateWiseReportProps) {

    const classes = useStyles();

    return (
        <>
            <div className={classes.header}>
                <Typography variant="h6" className={classes.headerText}>
                    {name} &gt; <span style={{color}}>
                        <NumberFormat value={total} displayType="text" thousandSeparator={true} />
                    </span>
                </Typography>
                {/* <Typography variant="h6" className={classes.timestamp}>
                    { lastUpdated }
                </Typography> */}
            </div>
            <Chloropeth data={data} name={name} color={color} />
            <Loader loading={loading} />
        </>
    );
}