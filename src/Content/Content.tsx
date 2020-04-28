import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { FC } from "react";
import { isMobile } from "react-device-detect";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: 90,
            maxWidth: '95% !important'
        },
        containerShift: {
            width: 'calc(95% - 210px)',
            marginLeft: 210
        }
    })
);

interface ContentProps {
    isLeftMenuOpen: boolean;
    Component: FC
}

export function Content({ isLeftMenuOpen, Component, ...props }: ContentProps) {
    const classes = useStyles();

    return (
        <Container 
            className={`${classes.container} ${isLeftMenuOpen && !isMobile ? classes.containerShift : ''}`}
            {...props}
        >
            <Component />
        </Container>
    );
}