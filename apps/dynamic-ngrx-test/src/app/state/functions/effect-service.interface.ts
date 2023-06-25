import { Observable } from 'rxjs';


export abstract class EffectService<T> {
  load: () => Observable<T[]> = () => [] as unknown as Observable<T[]>;
}
