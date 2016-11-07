import React from 'react';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route>
    // app
    <Route path='/' component={ require('./components/app') }>
      <IndexRoute component={ require('./containers/landing-page') } />
      // urls
      <Route path='fela'component={ require('./containers/fela-page') } />
      <Route path='graphql'component={ require('./containers/graphql-page') } />
    </Route>

    // 404
    <Route path='*' component={ require('./single-page/not-found') } />
  </Route>
);
