import React from 'react';
import { Route, DefaultRoute, RouteHandler, Link } from 'react-router';

import HomePage from '../pages/home/page';
import EditorPage from '../pages/editor/page';


export default class LoggedInRouter extends React.Component {
  render() {
    return (
      <div id="container">
        <div id="navigation" className="navbar">
          <header>
            <ul>
              <li><Link to="home">Home</Link></li>
              <li><Link to="editor">Editor</Link></li>
            </ul>
          </header>
        </div>

        <RouteHandler {...this.props} />
      </div>
    );
  }

  static getRoutes = function() {
    return (
      <Route name="app" path="/" handler={LoggedInRouter}>
        <DefaultRoute name="home" handler={HomePage} />
        <Route name="editor" path="/editor" handler={EditorPage} />
      </Route>
    );
  }

}
