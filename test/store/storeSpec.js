'use strict';

import StoreInject from 'inject!store/store';

describe('store', () => {
  let reduxMock, formReducerMock;

  beforeEach(() => {
    reduxMock = {
      createStore: sinon.stub(),
      combineReducers: sinon.stub().returns('combineReducers')
    };

    formReducerMock = sinon.stub();
  });

  it('creates store with form state reducer', () => {
    const store = StoreInject({
      'redux': reduxMock,
      './Form/FormReducer': formReducerMock
    }).default;

    expect(reduxMock.combineReducers).to.be.calledOnce;
    expect(reduxMock.combineReducers).to.be.calledWith({formState: formReducerMock});

    expect(reduxMock.createStore).to.be.calledOnce;
    expect(reduxMock.createStore).to.be.calledWith('combineReducers');
  });
});
