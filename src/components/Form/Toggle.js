'use strict';

import React, {PropTypes} from 'react';
import Toggle from 'material-ui/Toggle';

import toggleStyles from './styles/toggle';
import R from 'ramda';

export default React.createClass({
  propTypes: {
    errorText: PropTypes.string
  },
  render() {
    return  (
      <div>
        <Toggle {...R.omit(['errorText'], this.props)} thumbSwitchedStyle={toggleStyles.thumbSwitched}
          trackSwitchedStyle={toggleStyles.trackSwitched}/>
        {
          this.props.errorText ? <div style={toggleStyles.error}>{this.props.errorText}</div> : null
        }
      </div>
    );
  }
});
