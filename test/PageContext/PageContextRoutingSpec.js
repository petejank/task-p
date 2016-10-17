'use strict';

import PageContextRoutingInject from 'inject!components/PageContext/PageContextRouting';

describe('PageContextRouting', () => {
  let PageContexRouting;

  beforeEach(() => {
    PageContexRouting = PageContextRoutingInject({
      'other/window': {
        location: {
          hash: '#/testHash'
        }
      }
    });
  });

  it('redirectToDefault redirects only on initial call', () => {
    const replaceStub = sinon.stub();
    PageContexRouting.redirectToDefault(undefined, replaceStub);
    PageContexRouting.redirectToDefault(undefined, replaceStub);
    expect(replaceStub).to.be.calledOnce;
    expect(replaceStub).to.be.calledWith('/');
  });

  it('redirectToDefault redirects only on initial call', () => {
    expect(PageContexRouting.getPathName()).to.be.equal('/testHash');
  });
});
