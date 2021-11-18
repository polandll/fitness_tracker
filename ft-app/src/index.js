import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import App from './App'
import './App.css'

const client = new ApolloClient({
  uri: 'https://12f8c3dc-e431-45a1-8fbb-8dfe0adf1ceb-us-west1.apps.astra.datastax.com/api/graphql/fitness_tracker',
  cache: new InMemoryCache(),
  headers: {
    'x-cassandra-token': 'AstraCS:CsdMYDsjOzSDIoePJZLEAijf:ca4332533ff1d8e08e16a1869b463a44486c1c95b3f505be3e4f1a736e9086ee',
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
