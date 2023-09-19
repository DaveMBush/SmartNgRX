import {
  SpaceChildEntity,
  SpaceEntity,
  WorkspaceEntity,
} from './store/entities';

export interface SharedState {
  workspaces: WorkspaceEntity;
  spaces: SpaceEntity;
  currentWorkspace: string;
  spaceChildren: SpaceChildEntity;
}
