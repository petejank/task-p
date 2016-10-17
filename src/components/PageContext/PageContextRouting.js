'use strict';

let initCall = true;

import window from 'other/window';

export function redirectToDefault(next, replace) {
  // Always redirect to form page on init
  if (initCall) {
    initCall = false;
    replace('/');
  }
};

export function getPathName() {
  return window.location.hash.replace('#', '');
};

export const ROUTE_FORM = '/form';
export const ROUTE_REVIEW = '/review';
export const ROUTE_FINAL = '/final';
