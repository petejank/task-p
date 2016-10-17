'use strict';

import React, {PropTypes} from 'react';
import R from 'ramda';
import {connect} from 'react-redux';
import store from 'store/store';
import {CardText} from 'material-ui/Card';
import Card from 'components/Card/Card';
import CardActions from 'components/Card/CardActions';
import TextField from 'components/Form/TextField';
import Toggle from 'components/Form/Toggle';
import RaisedButton from 'components/Form/RaisedButton';

import * as FormActions from 'store/Form/FormActions'
import formValidator from 'validators/formValidator';
import * as PageContextRouting from './PageContextRouting';

import floatsStyles from 'assets/styles/floats';

const stateToProps = (store) => ({
  formState: store.formState
});

const FormPage = React.createClass({
  ProTypes: {
    pageType: PropTypes.string
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  goTo(route) {
    this.context.router.push(route);
  },
  componentDidMount() {
    this.routeChangeListener = this.context.router.listenBefore(location => {
      if (location.action === 'PUSH') {
        // Validate fields
        const validatedFields = this.props.formState.fields.map((field) => {
          return R.merge(field, {error: formValidator(field.value, field.inputType)});
        });

        validatedFields.forEach((field) => {
          store.dispatch(R.merge({type: FormActions.FORM_UPDATE}, field));
        });

        // If errors present don't allow to move anywhere beside back to /form
        if (R.find(field => !!field.error, validatedFields) && location.pathname !== PageContextRouting.ROUTE_FORM) {
          this.context.router.replace(PageContextRouting.getPathName());
        }
      }
    });
  },
  componentWillUnmount() {
    this.routeChangeListener();
  },
  updateFormState(event) {
    let actionData = {type: FormActions.FORM_UPDATE, name: event.target.name};
    actionData = R.merge(actionData, {value: event.target.type === 'checkbox' ? event.target.checked : event.target.value});
    store.dispatch(actionData);
  },
  render() {
    const isReview = this.props.pageType === 'review';

    return (
      <main>
        <Card>
          <CardText>
            <TextField hintText="Your name" floatingLabelText="Name"
              onChange={this.updateFormState} textFieldData={this.props.formState.fields[0]}/>
          </CardText>
          <CardText>
            <TextField hintText="Your company" floatingLabelText="Company"
              onChange={this.updateFormState} textFieldData={this.props.formState.fields[1]}/>
          </CardText>
          {/* Agreement toggled only visible on form page */}
          <CardText style={{visibility: isReview ? 'hidden' : 'visible'}}>
            <Toggle label="I agree to the terms of service" name="agreement" toggled={this.props.formState.fields[2].value}
              onToggle={this.updateFormState} errorText={this.props.formState.fields[2].error}/>
          </CardText>
          <CardActions>
            {(() => {
              /* Review page buttons */
              if (isReview) {
                return [
                  <RaisedButton key="0" style={floatsStyles.left} label="Back"
                    onClick={() => this.goTo(PageContextRouting.ROUTE_FORM)}/>,
                  <RaisedButton key="1" style={floatsStyles.right} label="Submit"
                    onClick={() => this.goTo(PageContextRouting.ROUTE_FINAL)}/>
                ];
              } else {
              /* Form page button */
                return (
                  <RaisedButton style={floatsStyles.right} label="Review"
                    onClick={() => this.goTo(PageContextRouting.ROUTE_REVIEW)}/>
                );
              }
            })()}
          </CardActions>
        </Card>
      </main>
    );
  }
});

export default connect(stateToProps)(FormPage);
