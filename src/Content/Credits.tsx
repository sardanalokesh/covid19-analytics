import { createStyles, Grid, Link, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            padding: theme.spacing(2),
            backgroundColor: theme.palette.secondary.main,
            borderRadius: 5,
            position: 'relative'
        },
        text: {
            fontSize: '1rem',
            textAlign: 'center'
        },
        link: {
            color: "#F38400"
        }
    })
);

export function Credits() {
    const classes = useStyles();
    return (
        <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" className={classes.text}>
                        Data Source: <Link className={classes.link} href="https://api.covid19india.org/" target="_blank">COVID19INDIA.ORG</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.text}>
                        Crafted by <Link className={classes.link} href="https://twitter.com/sardanalokesh" target="_blank">@sardanalokesh</Link>
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}