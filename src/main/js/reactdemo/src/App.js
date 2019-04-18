import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Demo from './components/Demo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/">To Home</Link>
                </li>
                <li>
                  <Link to="/demo/">To Demo</Link>
                </li>
              </ul>
            </nav>
            <Route path="/" exact component={Home}/>
            <Route path="/demo/" component={Demo}/>
          </div>
        </Router>
      </div>
    );
  }
}

function Home() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo"/>
    </header>
  );
}

export default App;
