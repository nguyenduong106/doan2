import React, { Component } from 'react';
import "./App.css";
import Header from './Header';
import routes from './routes';
import { Switch,Route, BrowserRouter as Router } from 'react-router-dom';

class App extends Component {

  render(){
    return (
      <Router>
        <div>
          <Header/>
          { this.showContentMenus (routes) }
        </div>
      </Router>
    );
  }
  
  showContentMenus = (routes) => {
      var rs= null;
      if(routes.length>0){
        rs= routes.map((route,index)=>{
          return (<Route
            key={index}
            path={route.path}
            exact={route.exct}
            component={route.main}
          />
          );
        });
      }

      return <Switch>{rs}</Switch>
  }
}
export default App;
