'use strict';

import React from 'react';
import FinalPageInject from 'inject!components/PageContext/FinalPage';
import {shallow} from 'enzyme';
import getDefaultFormState from '../getDefaultFormState';

describe('FinalPage', () => {
  let FinalPage, connectMock, componentPropBindMock, storeDispatchMock, connectWrapper;

  beforeEach(() => {
    connectMock = sinon.stub().returns(componentPropBindMock = sinon.stub());
    storeDispatchMock = sinon.stub();
    connectWrapper = FinalPageInject({
      'react-redux': {
        'connect': connectMock
      },
      'store/store': {
        dispatch: storeDispatchMock
      }
    }).default;
    FinalPage = componentPropBindMock.args[0][0];
  });

  it('connect component to formState on initial call', () => {
    expect(connectMock).to.be.calledOnce;
    expect(componentPropBindMock).to.be.calledOnce;

    const formState = {formState: {dummy: null}};
    expect(connectMock.args[0][0](formState)).to.be.deep.equal(formState);
  });

  it('on mount set form state to finalized', () => {
    const wrapper = shallow(<FinalPage formState={getDefaultFormState()}/>);
    wrapper.instance().componentDidMount();

    expect(storeDispatchMock).to.be.calledOnce;
    expect(storeDispatchMock).to.be.calledWith({
      type: 'FORM_FINALIZE'
    });
  });
});
