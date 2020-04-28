import { createStyles, makeStyles, Paper, Tab, Tabs, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginBottom: 5,
            display: 'inline-block',
            backgroundColor: 'transparent'
        },
        indicator: {
            display: 'none'
        },
        tab: {
            borderRadius: 5,
            backgroundColor: theme.palette.secondary.main,
            '&:not(:first-child)': {
              marginLeft: 2
            }
        },
        tabPanelBox: {
          padding: 0
        }
    })
);

export type AppTabType =  "today" | "summary";

interface AppTabsProps {
  summaryOnly?: boolean;
  defaultTab?: AppTabType;
  onTabChange: (tab: AppTabType) => void;
}

export function AppTabs( { summaryOnly, defaultTab, onTabChange }: AppTabsProps ) {
  const classes = useStyles();

  const [value, setValue] = React.useState<AppTabType>(defaultTab || summaryOnly ? "summary" : "today");

  const handleChange = (event: React.ChangeEvent<{}>, newValue: AppTabType) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  return (
    <>
      <Paper square className={classes.paper}>
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          aria-label="app tabs"
          classes={{indicator: classes.indicator}}
        >
          {!summaryOnly && <Tab label="Today" value="today" className={classes.tab} />}
          <Tab label="Summary" value="summary" className={classes.tab} />
        </Tabs>
      </Paper>
    </>
  );
}