import { Observable } from 'rxjs';

export interface CommonService {
  loadByIds(ids: string[]): Observable<Record<string, string>[]>;
}
