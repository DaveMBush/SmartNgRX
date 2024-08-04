import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { EffectService, PartialArrayDefinition } from '@smarttools/smart-ngrx';
import { Observable } from 'rxjs';

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

  override loadByIds(ids: string[]): Observable<Location[]> {
    return this.http.post<Location[]>(this.apiLocation, ids);
  }

  override update(newRow: Location): Observable<Location[]> {
    return this.http.put<Location[]>(this.apiLocation, newRow);
  }

  override add(row: Location): Observable<Location[]> {
    return this.http.post<Location[]>(this.apiLocation, row);
  }

  override delete(id: string): Observable<void> {
    return this.http.delete<undefined>(`${this.apiLocation}/${id}`);
  }

  override loadByIndexes(_: string, __: number, ___: number): Observable<PartialArrayDefinition> {
    throw new Error('Method not implemented.');
  }

}
