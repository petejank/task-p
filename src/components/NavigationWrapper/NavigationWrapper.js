'use strict';

import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import store from 'store/store';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';

import * as PageContextRouting from 'components/PageContext/PageContextRouting';
import tabStyles from './styles/tab';
import tabContainerStyles from './styles/tabContainer';
import paperStyles from './styles/paper';
import inkbarStyles from './styles/inkBar';
import R from 'ramda';

const stateToProps = (store) => ({
  formState: store.formState
});

const NavigationWrapper = React.createClass({
  propTypes: {
    location: PropTypes.object.isRequired
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  handleChange(route) {
    if (!this.props.formState.finalized) {
      this.context.router.push(route);
    }
  },
  render() {
    const inkBar = this.props.formState.finalized ? R.merge(inkbarStyles, {left: 2/3 * 100 + '%'}) : inkbarStyles;

    return (
      <section>
        <Paper zDepth={2} style={paperStyles}>
          <header>
            {/* Navigation */}
            <Tabs value={this.props.location.pathname} onChange={this.handleChange} inkBarStyle={inkBar}
              tabItemContainerStyle={tabContainerStyles}>
              <Tab label="Form" value={PageContextRouting.ROUTE_FORM} style={tabStyles}></Tab>
              <Tab label="Review" value={PageContextRouting.ROUTE_REVIEW} style={tabStyles}></Tab>
              <Tab label="Final" value={PageContextRouting.ROUTE_FINAL} style={tabStyles}></Tab>
            </Tabs>
          </header>
        </Paper>
        {this.props.children}
      </section>
    );
  }
});

export default connect(stateToProps)(NavigationWrapper);
