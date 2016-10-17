'use strict';

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import buttonLabelStyles from './styles/buttonLabel';

export default React.createClass({
  render() {
    return <RaisedButton {...this.props} labelStyle={buttonLabelStyles}/>
  }
});
