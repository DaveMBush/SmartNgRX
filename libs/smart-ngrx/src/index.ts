export * from './common/assert.function';
export * from './common/cast-to.function';
export * from './common/for-next.function';
export * from './facades/classic-ngrx.facade/action.factory';
export * from './providers/provide-smart-feature-entities.function';
export * from './providers/provide-smart-ngrx.function';
export * from './selector/create-smart-selector.function';
export * from './types/effect-service';
export * from './types/row-proxy-delete.interface';
export * from './types/smart-array.interface';

// store.function is needed for testing
export * from './selector/store.function';
export * from './socket/handle-socket-notification.function';

// testing utility functions (maybe move to their own lib?)
export * from './tests/functions/clear-state.function';
export * from './tests/functions/create-store.function';
export * from './tests/functions/set-state.function';

// types
export * from './types/partial-array-definition.interface';
export * from './types/smart-entity-definition.interface';
export * from './types/smart-ngrx-row-base.interface';

// error handling
export * from './error-handler/smart-ngrx-error-handler-token.const';
export * from './types/smart-ngrx-error-handler.interface';

// root injector
export * from './common/root-injector.function';
