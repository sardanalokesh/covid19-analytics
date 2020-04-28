import { Backdrop, CircularProgress, makeStyles, Theme, createStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
        zIndex: theme.zIndex.appBar - 1,
        color: '#fff',
        position: 'absolute',
        height: 'inherit',
        // backgroundColor: 'transparent'
    },
  }),
);

interface LoaderProps {
    loading: boolean;
}

export function Loader({ loading }: LoaderProps) {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}