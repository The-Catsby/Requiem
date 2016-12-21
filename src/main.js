import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import setMuiTheme from './setMuiTheme';

import App from './containers/App';

const muiTheme = setMuiTheme(navigator.userAgent);

render(
  	<MuiThemeProvider muiTheme={muiTheme}>
		<App />
  	</MuiThemeProvider>,
	document.getElementById('root')
);