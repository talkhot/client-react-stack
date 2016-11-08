import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import ReduxThunk from 'redux-thunk';
// reducers
import helmetReducer from './reducers/helmet';
import widgetFilterSelectedReducer from 'flux/reducers/widget-filter-selected';

// config
const networkInterface = createNetworkInterface('http://localhost:8080/graphql');

const client = new ApolloClient({
  networkInterface
});

const store = createStore(
  combineReducers({
    helmet: helmetReducer,
    widgetFilterSelected: widgetFilterSelectedReducer,
    apollo: client.reducer()
  }),
  compose(
    applyMiddleware(client.middleware(), ReduxThunk.withExtraArgument(client)),
    // enable Redux DevTools
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

const apolloProps = {
  client, store
};

export default apolloProps;
