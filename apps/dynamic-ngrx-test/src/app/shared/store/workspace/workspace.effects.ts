import { InjectionToken } from '@angular/core';

import { effectsFactory } from '@davembush/dynamic-ngrx/effects/effects.factory';

import { Workspace } from './workspace.interface';
import { WorkspaceEffectsService } from './workspace-effects.service';

export const workspaceEffectsServiceToken =
  new InjectionToken<WorkspaceEffectsService>('SprintFolderEffectsService');

export const workspaceEffects = effectsFactory<'Workspace', Workspace>(
  'Workspace',
  workspaceEffectsServiceToken
);
