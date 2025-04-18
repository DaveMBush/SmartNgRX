/* eslint-disable @smarttools/one-exported-item-per-file -- pass through exports */
export * from './classic-ngrx.facade/action.factory';
export * from './providers/provide-smart-feature-classic-entities.function';
export * from './smart-selector/create-smart-selector.function';

// store.function is needed for testing
export * from './smart-selector/store.function';
export * from './socket/handle-socket-notification.function';

// testing utility functions (maybe move to their own lib?)
export * from './tests/functions/clear-state.function';
export * from './tests/functions/create-store.function';
export * from './tests/functions/set-state.function';

// smart-core exports

export type {
  PartialArrayDefinition,
  RowProxyDelete,
  SmartArray,
  SmartEntityDefinition,
  SmartErrorHandler,
  SmartNgRXRowBase,
} from '@smarttools/core';
export {
  assert,
  castTo,
  delayedRegisterEntity,
  EffectService,
  globalMarkAndDeleteInit,
  provideSmartNgRX,
  rootInjector,
  smartErrorHandlerToken,
} from '@smarttools/core';
