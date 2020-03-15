import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Countries from './Components/Countries/Countries';
import CountryDetails from './Components/CountryDetails/CountryDetails';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/countries">
          <Redirect to={{ pathname: '/' }} />
        </Route>
        <Route exact path="/" component={Countries} />
        <Route path="/:name" component={CountryDetails} />
      </Switch>
    </Router>
  );
}
