'use strict';

import React from 'react';
import {connect} from 'react-redux';
import store from 'store/store';
import {CardText} from 'material-ui/Card';
import Card from 'components/Card/Card';
import TextField from 'components/Form/TextField';
import Toggle from 'components/Form/Toggle';
import * as FormActions from 'store/Form/FormActions';

const stateToProps = (store) => ({
  formState: store.formState
});

const FormPage = React.createClass({
  componentDidMount() {
    let actionData = {
      type: FormActions.FORM_FINALIZE
    };

    store.dispatch(actionData);
  },
  render() {
    return (
      <main>
        <Card>
          <CardText>
            <TextField hintText="Your name" floatingLabelText="Name" textFieldData={this.props.formState.fields[0]}
              disabled={true}/>
          </CardText>
          <CardText>
            <TextField hintText="Your company" floatingLabelText="Company" textFieldData={this.props.formState.fields[1]}
              disabled={true}/>
          </CardText>
          {/* Agreement toggled only visible on form page */}
          <CardText>
            <Toggle label="I agree to the terms of service" name="agreement" toggled={this.props.formState.fields[2].value}/>
          </CardText>
        </Card>
      </main>
    );
  }
});

export default connect(stateToProps)(FormPage);
