'use strict';

export default () => {
  return {
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
};
