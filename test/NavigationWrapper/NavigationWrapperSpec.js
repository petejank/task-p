'use strict';

import React, {PropTypes} from 'react';
import NavigationWrapperInject from 'inject!components/NavigationWrapper/NavigationWrapper';
import {shallow} from 'enzyme';

describe('NavigationWrapper', () => {
  let NavigationWrapper, connectMock, componentPropBindMock, connectWrapper;

  beforeEach(() => {
    connectMock = sinon.stub().returns(componentPropBindMock = sinon.stub());
    connectWrapper = NavigationWrapperInject({
      'react-redux': {
        'connect': connectMock
      }
    }).default;
    NavigationWrapper = componentPropBindMock.args[0][0];
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
      shallow(<NavigationWrapper/>);
    } catch(error) {
      // Dummy
    }

    expect(stub).to.be.calledTwice;
    expect(stub.args[0][0]).to.contain(
      'Warning: Failed prop type: Required prop `location` was not specified in `NavigationWrapper`'
    );
    expect(stub.args[1][0]).to.contain(
      'Warning: Failed context type: Required context `router` was not specified in `NavigationWrapper`'
    );

    console.error.restore();
  });

  it('when form state not finalized handleChange() pushes passed route to history', () => {
    const context = {context: { router: {push: sinon.stub()}}};
    const wrapperFinalized = shallow(<NavigationWrapper formState={{finalized: true}} location={{}}/>, context);
    wrapperFinalized.instance().handleChange('testRoute');
    expect(context.context.router.push).not.to.be.calledOnce;

    const wrapperNotFinalized = shallow(<NavigationWrapper formState={{finalized: false}} location={{}}/>, context);
    wrapperNotFinalized.instance().handleChange('testRoute');
    expect(context.context.router.push).to.be.calledOnce;
    expect(context.context.router.push).to.be.calledWith('testRoute');
  });
});
