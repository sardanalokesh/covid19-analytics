import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    bar: {
      height: 80,
      padding: '8px 0',
      borderBottom: '1px solid #707070',
      zIndex: theme.zIndex.modal + 10,
      justifyContent: 'center'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('md')]: {
        marginRight: theme.spacing(0)
      }
    },
    logo: {
      flexGrow: 1
    },
    logoImg: {
      height: 50,
      padding: '5px 0',
      [theme.breakpoints.down('md')]: {
        height: 40
      }
    },
    title: {
      fontSize: 25,
      fontFamily: 'Rubik',
      lineHeight: '29px',
      color: '#ffffff',
      textDecoration: 'none',
      [theme.breakpoints.down('md')]: {
        fontSize: 20,
        lineHeight: '24px'
      }
    },
    subtitle: {
      fontSize: 10.5,
      fontWeight: 'bold',
      fontFamily: 'Open Sans',
      lineHeight: '15px',
      color: '#ffffff',
      maxWidth: 78,
      margin: '5px 0 0 5px',
      textDecoration: 'none',
      [theme.breakpoints.down('md')]: {
        fontSize: 7.5,
        lineHeight: '10px',
        maxWidth: 60
      }
    }
  }),
);

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.bar}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.title}>
            COVID-19 INDIA
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
