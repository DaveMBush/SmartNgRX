import { LoadByIdsEffect } from './load-by-ids-effect.type';
import { LoadEffect } from './load-effect.type';
/**
 * This is an internal interface that should not be required
 * by anyone developing with this lib.
 *
 * This is the type information that effectsFactory returns.
 *
 * @see `effectsFactory`
 * @see `EffectService`
 * @see `LoadEffect`
 * @see `LoadByIdsEffect`
 */
export interface EffectsFactory<T> {
  /**
   * The effect the `load` action will end up calling.
   */
  load: LoadEffect<T>;
  /**
   * Used internally to make the store think the records
   * represented by the IDs has already been loaded by using
   * the defaultRow functionality.
   */
  loadByIdsPreload: LoadEffect<T>;
  /**
   * The effect the `loadById` action will end up calling.
   */
  loadByIds: LoadByIdsEffect<T>;
}
