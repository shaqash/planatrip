import React, { Suspense, lazy, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase, { Firebase } from './firebase';
import './App.css';

export const FireContext = createContext<null | Firebase>(null);
const Main = lazy(() => import('./routes/Main'));
const Trip = lazy(() => import('./routes/Trip'));
const Thanks = lazy(() => import('./routes/Thanks'));

function App() {
  return (
    <FireProvider>
      <Router basename={process.env.PUBLIC_URL}>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact component={Main} path={'/'} />
            <Route component={Trip} path={'/trip/:id'} />
            <Route component={Thanks} path={'/thanks'} />
          </Switch>
        </Suspense>
      </Router>
    </FireProvider>
  );
}

function FireProvider({ children }: { children: React.ReactNode }) {
  return (
    <FireContext.Provider value={firebase}>
      <FireContext.Consumer>{(fire) => fire ? children : <p>can't pull firebase</p>}</FireContext.Consumer>
    </FireContext.Provider>
  );
};

export default App;
