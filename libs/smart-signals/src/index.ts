/* eslint-disable @smarttools/one-exported-item-per-file -- passthrough exports*/
export * from './providers/provide-smart-feature-signal-entities.function';
export * from './smart-signals/create-smart-signal.function';
export * from './smart-signals/get-top-child-rows.function';
export * from './socket/handle-socket-notification.function';
export type {
  MarkAndDeleteInit,
  PartialArrayDefinition,
  RowProxyDelete,
  SmartArray,
  SmartEntityDefinition,
  SmartErrorHandler,
  SmartNgRXRowBase,
} from '@smarttools/smart-core';
export {
  assert,
  castTo,
  EffectService,
  provideSmartNgRX,
  smartErrorHandlerToken,
} from '@smarttools/smart-core';
