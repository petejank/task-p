'use strict';

import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';

import textFieldStyles from './styles/textField';
import textFieldLabelStyles from './styles/textFieldLabel';
import R from 'ramda';

export default React.createClass({
  propTypes: {
    textFieldData: PropTypes.object.isRequired,
    hintText: PropTypes.string.isRequired,
    floatingLabelText: PropTypes.string.isRequired,
    onChange: PropTypes.func
  },
  render() {
    return <TextField {...R.omit(['textFieldData'], this.props)}
              name={this.props.textFieldData.name}
              value={this.props.textFieldData.value}
              errorText={this.props.textFieldData.error}
              floatingLabelFixed={true}
              style={textFieldStyles}
              floatingLabelStyle={textFieldLabelStyles}/>
  }
});
