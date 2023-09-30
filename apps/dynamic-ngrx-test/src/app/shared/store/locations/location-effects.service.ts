import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EffectService } from '@davembush/dynamic-ngrx/effects/effect-service';

import { Location } from './location.interface';

@Injectable()
export class LocationEffectsService extends EffectService<Location> {
  constructor(private http: HttpClient) {
    super();
  }

  override load: () => Observable<Location[]> = () => {
    return this.http.get<Location[]>('http://localhost:3000/api/locations');
  };

  override loadByIds: (ids: string[]) => Observable<Location[]> = (
    _: string[],
  ) => {
    return of([] as Location[]);
  };
}
