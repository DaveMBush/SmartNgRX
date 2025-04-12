export * from './facades/classic-ngrx.facade/action.factory';
export * from './providers/provide-smart-feature-classic-entities.function';
export * from './providers/provide-smart-feature-signal-entities.function';
export * from './providers/provide-smart-ngrx.function';
export * from './smart-selector/create-smart-selector.function';

// store.function is needed for testing
export * from './smart-selector/store.function';
export * from './socket/handle-socket-notification.function';

// testing utility functions (maybe move to their own lib?)
export * from './tests/functions/clear-state.function';
export * from './tests/functions/create-store.function';
export * from './tests/functions/set-state.function';
