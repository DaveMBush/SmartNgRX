import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { EffectService } from '@smart/smart-ngrx/effects/effect-service';

import { Location } from './location.interface';

@Injectable()
export class LocationEffectsService extends EffectService<Location> {
  constructor(
    private http: HttpClient,
    private store: Store,
  ) {
    super();
  }

  override load: () => Observable<Location[]> = () => {
    return this.http.get<Location[]>('./api/locations');
  };

  override loadByIds: (ids: string[]) => Observable<Location[]> = (
    _: string[],
  ) => {
    return of([] as Location[]);
  };

  override update: (row: Location) => Observable<Location[]> = (
    row: Location,
  ) => {
    return this.http.put<Location[]>('./api/locations', row);
  };
}
