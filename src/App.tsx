import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import React, { useState, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Content } from './Content/Content';
import Header from './Header/Header';
import LeftMenu from './LeftMenu/LeftMenu';
import { isMobile } from 'react-device-detect';

const Overall = React.lazy(() => import('./Content/Overall'));
const Today = React.lazy(() => import('./Content/Today'));
const World = React.lazy(() => import('./Content/World'));
const States = React.lazy(() => import('./Content/States/States'));
const Credits = React.lazy(() => import('./Content/Credits'));

function App() {

  // app theme
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#000000'
      },
      secondary: {
        main: '#242435'
      },
      background: {
        paper: '#242435',
        default: '#000000'
      },
      text: {
        primary: '#ffffff'
      }
    },
    overrides: {
      MuiFormLabel: {
        root: {
          color: '#ffffff',
          '&.Mui-focused': {
            color: '#ffffff'
          },
          "&$disabled": {
            "color": "#ffffff"
          }
        }
      },
      MuiSelect: {
        icon: {
          color: '#ffffff'
        }
      },
      MuiInput: {
        underline: {
          borderBottom: '2px solid #fff'
        }
      },
      MuiPopover: {
        root: {
          zIndex: '2000 !important' as any        
        }
      },
      MuiButtonBase: {
        root: {
          color: "#fff !important",
          borderColor: "#fff !important",
          '&.Mui-selected': {
            background: '#fff !important',
            color: '#000 !important'
          }
        }
      }
    }
  });

  const [leftMenuOpen, setLeftMenuOpen] = useState(!isMobile);

  const menuClickHandler = () => {
    setLeftMenuOpen(!leftMenuOpen);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Header onMenuClick={menuClickHandler} />
        <BrowserRouter>
            <LeftMenu isOpen={leftMenuOpen} onToggle={setLeftMenuOpen}/>
            <Suspense fallback="Loading...">
            <Switch>
              <Route path="/summary">
                  <Content isLeftMenuOpen={leftMenuOpen} Component={Overall} />
              </Route>
              <Route path="/today">
                  <Content isLeftMenuOpen={leftMenuOpen} Component={Today} />
              </Route>
              <Route path="/states">
                  <Content isLeftMenuOpen={leftMenuOpen} Component={States} />
              </Route>
              <Route path="/world">
                  <Content isLeftMenuOpen={leftMenuOpen} Component={World} />
              </Route>
              <Route path="/credits">
                  <Content isLeftMenuOpen={leftMenuOpen} Component={Credits} />
              </Route>
              <Route exact path="*">
                  <Redirect to="/summary" />
              </Route>
            </Switch>
            </Suspense>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
