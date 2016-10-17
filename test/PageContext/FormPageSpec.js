'use strict';

import React from 'react';
import FormPageInject from 'inject!components/PageContext/FormPage';
import getDefaultFormState from '../getDefaultFormState';
import {shallow} from 'enzyme';

describe('FormPage', () => {
  let FormPage, connectMock, componentPropBindMock, storeDispatchMock, connectWrapper;

  beforeEach(() => {
    connectMock = sinon.stub().returns(componentPropBindMock = sinon.stub());
    storeDispatchMock = sinon.stub();
    connectWrapper = FormPageInject({
      'react-redux': {
        'connect': connectMock
      },
      'store/store': {
        dispatch: storeDispatchMock
      }
    }).default;
    FormPage = componentPropBindMock.args[0][0];
  });

  it('connect component to formState on initial call', () => {
    expect(connectMock).to.be.calledOnce;
    expect(componentPropBindMock).to.be.calledOnce;

    const formState = {formState: {dummy: null}};
    expect(connectMock.args[0][0](formState)).to.be.deep.equal(formState);
  });

  it('fails to render when required props and context are not passed', () => {
    const stub = sinon.stub(console, 'error');

    try {
      shallow(<FormPage/>);
    } catch(error) {
      // Dummy
    }

    expect(stub).to.be.calledOnce;
    expect(stub.args[0][0]).to.contain(
      'Warning: Failed context type: Required context `router` was not specified in `FormPage`'
    );

    console.error.restore();
  });

  describe('component succesfuly rendered', () => {
    let wrapper, context, wrapperInstance;

    beforeEach(() => {
      context = {context: { router: {push: sinon.stub()}}};
      wrapper = shallow(<FormPage formState={getDefaultFormState()}/>, context);
      wrapperInstance = wrapper.instance();
    });

    it('goTo() pushes route entry to history', () => {
      wrapper.instance().goTo('testRoute');
      expect(context.context.router.push).to.be.calledOnce;
      expect(context.context.router.push).to.be.calledWith('testRoute');
    });

    it('componentWillUnmount() calls route change listener callback', () => {
      wrapperInstance.routeChangeListener = sinon.stub();
      wrapperInstance.componentWillUnmount();
      expect(wrapperInstance.routeChangeListener).to.be.calledOnce;
    });

    it('updateFormState() dispatches form update event', () => {
      const event = {
        target: {
          name: 'testName',
          type: 'testType',
          value: 'testValue'
        }
      };

      wrapperInstance.updateFormState(event)
      expect(storeDispatchMock).to.be.calledOnce;
      expect(storeDispatchMock).to.be.calledWith({
        type: 'FORM_UPDATE',
        name: 'testName',
        value: 'testValue'
      });
    });

    it('updateFormState() dispatches form update event for checkboxes', () => {
      const event = {
        target: {
          name: 'testName',
          type: 'checkbox',
          checked: true
        }
      };

      wrapperInstance.updateFormState(event)
      expect(storeDispatchMock).to.be.calledOnce;
      expect(storeDispatchMock).to.be.calledWith({
        type: 'FORM_UPDATE',
        name: 'testName',
        value: true
      });
    });
  });
});
