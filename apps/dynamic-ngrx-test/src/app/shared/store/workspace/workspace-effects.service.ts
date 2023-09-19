import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { EffectService } from '@davembush/dynamic-ngrx/effects/effect-service';

import { Workspace } from './workspace.interface';

@Injectable()
export class WorkspaceEffectsService extends EffectService<Workspace> {
  constructor(private http: HttpClient) {
    super();
  }

  override load: () => Observable<Workspace[]> = () => {
    return this.http.get<Workspace[]>('http://localhost:3000/api/workspaces');
  };

  override loadByIds: (ids: string[]) => Observable<Workspace[]> = (
    _: string[]
  ) => {
    return of([] as Workspace[]);
  };
}
