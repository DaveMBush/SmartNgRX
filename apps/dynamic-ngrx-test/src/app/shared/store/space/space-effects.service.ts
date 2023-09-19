import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { EffectService } from '@davembush/dynamic-ngrx/effects/effect-service';

import { childrenTransform } from './children-transform.function';
import { Space } from './space.interface';

@Injectable()
export class SpaceEffectsService extends EffectService<Space> {
  constructor(private http: HttpClient) {
    super();
  }

  override load: () => Observable<Space[]> = () => {
    return of([] as Space[]);
  };

  override loadByIds: (ids: string[]) => Observable<Space[]> = (
    ids: string[]
  ) => {
    return this.http
      .post<Space[]>('http://localhost:3000/api/spaces', ids)
      .pipe(map(childrenTransform));
  };
}
