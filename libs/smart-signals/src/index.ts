/* eslint-disable @smarttools/one-exported-item-per-file -- passthrough exports*/
export * from './providers/provide-smart-feature-signal-entities.function';
export * from './smart-signals/create-inner-smart-signal.function';
export * from './smart-signals/create-smart-signal.function';
export * from './socket/handle-socket-notification.function';
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
  EffectService,
  provideSmartNgRX,
  rootInjector,
  smartErrorHandlerToken,
} from '@smarttools/core';
