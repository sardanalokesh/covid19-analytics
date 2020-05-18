import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import NumberFormat from "react-number-format";
import { Loader } from "./Loader";
import { PackedCircles, PackedCirclesData } from "./PackedCircles";

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
    },
    buttonGroup: {
        display: 'block',
        textAlign: 'center'
    },
    buttonLabel: {
        [theme.breakpoints.down('md')]: {
            fontSize: 10
        }
    }
  }),
);

interface StateChartProps {
    name: string;
    color: string;
    data: PackedCirclesData[];
    loading: boolean;
    indicative?: boolean;
}

export function StateChart({ name, color, data, loading, indicative }: StateChartProps) {
    const classes = useStyles();
    /* const [caseType, setCaseType] = useState<CaseType>("confirmed"); */
    const sum = data.reduce((a,d) => {
        return d.value + a;
    }, 0);

    /* const handleChange = (event: React.MouseEvent<HTMLElement>, value: CaseType) => {
        setCaseType(value);
    }; */

    return (
        <>
            <Typography variant="h6" className={classes.header}>
                {name} {!indicative && <><span> &gt;</span> <span style={{color}}>
                    <NumberFormat value={sum} displayType="text" thousandSeparator={true} />
                </span></>}
            </Typography>
            {/* <ToggleButtonGroup size="small" value={caseType} exclusive onChange={handleChange} className={classes.buttonGroup}>
                <ToggleButton key={1} value="confirmed" classes={{label: classes.buttonLabel}}>
                    Confirmed
                </ToggleButton>,
                <ToggleButton key={2} value="active" classes={{label: classes.buttonLabel}}>
                    Active
                </ToggleButton>,
                <ToggleButton key={3} value="recovered" classes={{label: classes.buttonLabel}}>
                    Recovered
                </ToggleButton>,
                <ToggleButton key={4} value="deceased" classes={{label: classes.buttonLabel}}>
                    Deaths
                </ToggleButton>,
            </ToggleButtonGroup> */}
            <PackedCircles name={name} data={data} indicative={indicative} />
            <Loader loading={loading} />
        </>
    );
}