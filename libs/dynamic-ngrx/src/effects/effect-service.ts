import { Observable } from 'rxjs';

/**
 * This is the abstract class that all services the Effects
 * use must implement.
 */
export abstract class EffectService<T> {
  abstract load: () => Observable<T[]>;
  abstract loadByIds: (ids: string[]) => Observable<T[]>;
}
