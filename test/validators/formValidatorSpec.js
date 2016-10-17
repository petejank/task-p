'use strict';

import formValidator from 'validators/formValidator';

describe('formValidator', () => {
  it('return error text for checkbox when value false', () => {
    expect(formValidator('', 'checkbox')).to.be.equal('This option cannot be left unchecked');
  });

  it('return error text for not-checkbox types when value false', () => {
    expect(formValidator('', 'text')).to.be.equal('Field should not be empty');
    expect(formValidator('', 'button')).to.be.equal('Field should not be empty');
  });

  it('return empty error text when value not false', () => {
    expect(formValidator('test', 'button')).to.be.equal('');
    expect(formValidator(true, 'button')).to.be.equal('');
  });
});
