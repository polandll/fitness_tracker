import React from 'react'
import ReactDOM from 'react-dom'
import { Route } from 'wouter'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

import Home from './pages/Home'
import Meals from './pages/Meals'
import MealItems from './pages/MealItems'
import UserInfo from './pages/UserInfo'

import './index.css'

const client = new ApolloClient({
  uri: 'https://12f8c3dc-e431-45a1-8fbb-8dfe0adf1ceb-us-west1.apps.astra.datastax.com/api/graphql/fitness_tracker',
  cache: new InMemoryCache(),
  headers: {
    'x-cassandra-token': 'AstraCS:CsdMYDsjOzSDIoePJZLEAijf:ca4332533ff1d8e08e16a1869b463a44486c1c95b3f505be3e4f1a736e9086ee',
  },
})

const App = () => {
  return (
    <>
      <Route path='/'><Home /></Route>
      <Route path='/:userId'>
        {params => <UserInfo userId={params.userId} />}
      </Route>
      <Route path='/:userId/meals'><Meals /></Route>
      <Route path='/:userId/mealItems'><MealItems /></Route>
    </>
  );
}

export default App

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
