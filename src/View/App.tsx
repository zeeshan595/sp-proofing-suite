import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import INavigation from "../Model/Navigation";
import * as firebase from 'firebase/app';
import Login from "./Login/Login.connect";

export interface IAppProps {
  Navigation?: INavigation[];
  Authenticated?: boolean;
};

export interface IAppState {

};

class App extends React.Component<IAppProps, IAppState>
{
  render() {
    if (!this.props.Authenticated) {
      if (window.location.pathname != "/") {
        window.location.pathname = "/";
      }
      return <Login />
    }
    return (
      <BrowserRouter>
        <div>
          {this.props.Navigation.map((el, index) => (
            <Route
              key={index}
              path={el.Path}
              component={el.Component}
              exact={el.exact}
            />
          ))}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;