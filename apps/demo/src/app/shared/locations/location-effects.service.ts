import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, of } from 'rxjs';

import { EffectService } from '@smart/smart-ngrx/effects/effect-service';

import { Location } from './location.interface';

@Injectable()
export class LocationEffectsService extends EffectService<Location> {
  apiLocation = './api/locations';
  constructor(
    private http: HttpClient,
    private store: Store,
  ) {
    super();
  }

  override loadByIds: (ids: string[]) => Observable<Location[]> = (
    ids: string[],
  ) => {
    return this.http.post<Location[]>(this.apiLocation, ids);
  };

  override update: (
    oldRow: Location,
    newRow: Location,
  ) => Observable<Location[]> = (oldRow: Location, newRow: Location) => {
    return this.http
      .put<Location[]>(this.apiLocation, newRow)
      .pipe(catchError(() => of([oldRow])));
  };

  override add: (row: Location) => Observable<Location[]> = (row: Location) => {
    return this.http.post<Location[]>(this.apiLocation, row);
  };

  override delete: (id: string) => Observable<void> = (
    id: string,
  ): Observable<void> => {
    return this.http.delete<undefined>(`${this.apiLocation}/${id}`);
  };
}
