'use strict';

import React from 'react';
import {Router, Route, IndexRedirect, useRouterHistory} from 'react-router';
import {createHashHistory} from 'history'
import FormPage from './FormPage';
import FinalPage from './FinalPage';
import ReviewPage from './ReviewPage';
import NavigationWrapper from 'components/NavigationWrapper/NavigationWrapper';
import * as PageContextRouting from './PageContextRouting';

import pageContextStyles from './styles/pageContext';

const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })

export default React.createClass({
  render() {
    return (
      <section style={pageContextStyles}>
        {/* Routing section */}
        <Router history={appHistory}>
          <Route path="/" component={NavigationWrapper} onEnter={PageContextRouting.redirectToDefault}>
            <IndexRedirect to="form"/>
            <Route path={PageContextRouting.ROUTE_FORM} component={FormPage}/>
            <Route path={PageContextRouting.ROUTE_REVIEW} component={ReviewPage}/>
            <Route path={PageContextRouting.ROUTE_FINAL} component={FinalPage}/>
          </Route>
        </Router>
      </section>
    );
  }
});
