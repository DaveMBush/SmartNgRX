import { Observable } from 'rxjs';

export abstract class EffectService<T> {
  abstract load: () => Observable<T[]>;
  abstract loadByIds: (ids: string[]) => Observable<T[]>;
}
