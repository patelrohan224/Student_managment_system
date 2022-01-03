import logo from './logo.svg';
import './App.css';
import Home from "./components/Home"
import { Route, Switch } from 'react-router-dom';
import RedirectRoute from "./components/Redirect"
import Addstudents from "./components/Addstudents"
import AddContest from './components/Addcontest';
function App() {
  return (
    <div className="App">
      {/* <AddContest /> */}
      <Switch >
        <Route to="/"  exact> 
          <Home />
        </Route>
         <Route to="/redirect" exact> 
        <RedirectRoute />
        </Route>
        <Route to="/add"  exact> 
        <Addstudents />
        </Route>       
      </Switch>
    </div>
  );
}

export default App;
