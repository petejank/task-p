'use strict';

import 'assets/styles/base.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from 'store/store';
import PageContext from 'components/PageContext/PageContext';
import injectTapEventPlugin from 'react-tap-event-plugin';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import tabStyles from 'assets/styles/tabs';

const theme = getMuiTheme(lightBaseTheme, tabStyles);

injectTapEventPlugin();

ReactDOM.render((
  <Provider store={store}>
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <PageContext/>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('wrapper'));
