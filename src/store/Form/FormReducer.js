'use strict';

import * as actions from './FormActions';
import R from 'ramda';

const initialState = {
  fields: [
    {
      name: 'name',
      value: '',
      error: '',
      inputType: 'text'
    },
    {
      name: 'company',
      value: '',
      error: '',
      inputType: 'text'
    },
    {
      name: 'agreement',
      value: false,
      error: '',
      inputType: 'checkbox'
    }
  ],
  finalized: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.FORM_UPDATE: {
      const fieldData = R.find(R.propEq('name', action.name), state.fields);
      const newFieldData = R.merge(fieldData, R.omit(['type'], action));
      return R.merge(state, {fields: R.update(state.fields.indexOf(fieldData), newFieldData, state.fields)});
    }
    case actions.FORM_FINALIZE: {
      return R.merge(state, {finalized: true});
    }
    default: {
      return state;
    }
  };
};
