'use strict';

import React from 'react';
import {CardActions} from 'material-ui/Card';
import cardActionsStyles from './styles/cardActions';

export default React.createClass({
  render() {
    return (
      <CardActions style={cardActionsStyles}>
        {this.props.children}
      </CardActions>
    );
  }
});
