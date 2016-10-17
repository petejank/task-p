'use strict';

import React from 'react';
import {Card} from 'material-ui/Card';
import cardStyles from './styles/card';

export default React.createClass({
  render() {
    return (
      <Card style={cardStyles}>
        {this.props.children}
      </Card>
    );
  }
});
