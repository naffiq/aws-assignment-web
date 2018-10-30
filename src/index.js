import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './index.css';

import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import AWSAppSyncClient from "aws-appsync";
import AppSync from './aws-exports.js';
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";

const client = new AWSAppSyncClient({
  url: AppSync.graphqlEndpoint,
  region: AppSync.region,
  auth: {
      type: AUTH_TYPE.API_KEY,
      apiKey: AppSync.apiKey,
  },
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
        <App />
    </Rehydrated>
  </ApolloProvider>
)


ReactDOM.render(<WithProvider />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
