'use strict';

const CHECKBOX_ERROR_MESSAGE = 'This option cannot be left unchecked';
const TEXT_ERROR_MESSAGE = 'Field should not be empty';

export default function(value, type) {
  if (!value) {
    return type === 'checkbox' ? CHECKBOX_ERROR_MESSAGE : TEXT_ERROR_MESSAGE;
  } else {
    return '';
  }
};
