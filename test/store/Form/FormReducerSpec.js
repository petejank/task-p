'use strict';

import formReducer from 'store/Form/FormReducer';
import getDefaultFormState from '../../getDefaultFormState';

describe('FormReducer', () => {
  it('return default form state when no state passed', () => {
    expect(formReducer(undefined, {})).to.be.deep.equal(getDefaultFormState());
  });

  it('current state is returned when action type is unknown', () => {
    expect(formReducer({testState: 'testState'}, {type: 'unknownType'})).to.be.deep.equal({testState: 'testState'});
  });

  it('update field data on FORM_UPDATE action', () => {
    const newState = formReducer(
      getDefaultFormState(), {type: 'FORM_UPDATE', name: 'name', value: 'test1', error: 'error1'}
    );

    const oldState = getDefaultFormState();
    oldState.fields[0] = {name: 'name', value: 'test1', error: 'error1', inputType: 'text'};
    expect(newState).to.be.deep.equal(oldState);
  });

  it('finalize form on FORM_FINALIZE action', () => {
    const newState = formReducer({}, {type: 'FORM_FINALIZE'});
    expect(newState).to.be.deep.equal({finalized: true});
  });
});
