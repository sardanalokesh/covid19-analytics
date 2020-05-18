import { createStyles, Drawer, Hidden, List, ListItem, ListItemText, makeStyles, SwipeableDrawer, Theme, withWidth, WithWidth } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LeftMenuProps extends WithWidth {
    isOpen: boolean,
    onToggle: (open: boolean) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            flexShrink: 0
        },
        paper: {
            backgroundColor: theme.palette.secondary.main,
            border: '1px solid #707070',
            marginTop: 120,
            width: 210,
            borderRadius: 5
        },
        toolbar: theme.mixins.toolbar,
        list: {
            backgroundColor: theme.palette.secondary.main,
            borderRadius: 5
        },
        link: {
            color: theme.palette.text.primary,
            textDecoration: 'none'
        },
        listItem: {
            opacity: 0.7,
            backgroundColor: 'transparent',
            '&.Mui-selected,&.Mui-selected:hover': {
                opacity: 1,
                backgroundColor: 'rgba(0,0,0,0.4)'
            }
        }
    })
)

const LeftMenu = ({ isOpen, onToggle, width, ...props }: LeftMenuProps) => {
    const classes = useStyles();
    const { pathname } = useLocation();
    const [selectedItem, setSelectedItem] = useState("us");

    const handleListItemClick = (_event: React.MouseEvent<HTMLDivElement, MouseEvent>, value: string) => {
        setSelectedItem(value);
    }

    const drawer = (
        <List
            component="nav"
            aria-label="Vertical tabs example"
        >
            {
                [
                    {
                        text: "Summary",
                        value: "summary"
                    },
                    {
                        text: "Today",
                        value: "today"
                    },
                    {
                        text: "States",
                        value: "states"
                    },
                    {
                        text: "World",
                        value: "world"
                    },
                    {
                        text: "Credits",
                        value: "credits"
                    }
                ].map(item => {
                    const {text, value} = item;
                    return (
                        <Link to={`/${value}`} key={value} className={classes.link}>
                            <ListItem button 
                                onClick={event => handleListItemClick(event, value)}
                                selected={selectedItem === value}
                                className={classes.listItem}
                            >
                                <ListItemText primary={text} />
                            </ListItem>
                        </Link>
                    );
                })
            }
        </List>
    );

    const drawerToggleHandler = (isOpen: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
      ) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        onToggle(isOpen);
    };

    useEffect(() => {
        const val = pathname.slice(1).split("/")[0].split("?")[0];
        setSelectedItem(val);
    }, [pathname]);

    return (
        <>
            <Hidden smUp>
                <SwipeableDrawer
                        className={classes.drawer}
                        anchor='left'
                        open={isOpen}
                        classes={{ paper: classes.paper }}
                        onOpen={drawerToggleHandler(true)}
                        onClose={drawerToggleHandler(false)}
                        {...props}
                    >
                        {drawer}
                </SwipeableDrawer>
            </Hidden>
            <Hidden smDown>
                <Drawer
                        className={classes.drawer}
                        variant={'persistent'}
                        anchor='left'
                        open={isOpen}
                        classes={{ paper: classes.paper }}
                        {...props}
                    >
                        {drawer}
                </Drawer>
            </Hidden>
        </>
    )
};

export default withWidth()(LeftMenu);