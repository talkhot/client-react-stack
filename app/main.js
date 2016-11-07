import debug from 'debug';
// Paths are relative to `app` directory
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
// redux
import { ApolloProvider } from 'react-apollo';
import apolloProps from './flux/apollo-props';
// intl
import { IntlProvider } from 'react-intl';
import intlLoader from 'utils/intl-loader';
// styles
import { Provider as FelaProvider } from 'react-fela';
import { createRenderer } from 'fela';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// other
import injectTapEventPlugin from 'react-tap-event-plugin';
import 'whatwg-fetch'; // Polyfill fetch

const { NODE_ENV } = process.env;
if (NODE_ENV === 'development') { debug.enable('dev,koa'); }

(async () => {
  // add our static styles
  if (process.env.BROWSER) {
    require('styles/normalize.css');
    require('styles/font.css');
    require('styles/global.css');
  }

  // Needed for onTouchTap
  injectTapEventPlugin();

  // load the intl-polyfill if needed
  const locale = 'en';
  await intlLoader(locale);

  const intlProps = {
    locale
  };

  const felaProps = {
    mountNode: document.getElementById('stylesheet'),
    renderer: createRenderer()
  };

  const routerProps = {
    routes: require('routes'),
    history: browserHistory
  };

  const element = (
    <ApolloProvider { ...apolloProps }>
      <IntlProvider { ...intlProps }>
        <FelaProvider { ...felaProps }>
          <MuiThemeProvider>
            <Router { ...routerProps } />
          </MuiThemeProvider>
        </FelaProvider>
      </IntlProvider>
    </ApolloProvider>
  );

  ReactDOM.render(
    element,
    document.getElementById('root')
  );
})();
