import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';
import { VirtualArray } from './virtual-array.class';

type FieldMap = Map<string, VirtualArray<SmartNgRXRowBase>>;
type IdMap = Map<string, FieldMap>;
type FeatureMap = Map<string, IdMap>;

class VirtualArrayMap {
  private entityMap = new Map<string, FeatureMap>();

  get(
    feature: string,
    entity: string,
    id: string,
    field: string,
  ): VirtualArray<SmartNgRXRowBase> | undefined {
    const key = `${feature}-${entity}`;
    const featureMap = this.entityMap.get(key);
    if (!featureMap) {
      return;
    }
    const idMap = featureMap.get(id);
    if (!idMap) {
      return;
    }
    const fieldMap = idMap.get(field);
    if (!fieldMap) {
      return;
    }
    return fieldMap.get(field);
  }

  // eslint-disable-next-line max-params-no-constructor/max-params-no-constructor -- needed for clarity
  set(
    feature: string,
    entity: string,
    id: string,
    field: string,
    value: VirtualArray<SmartNgRXRowBase>,
  ): void {
    const key = `${feature}-${entity}`;
    let featureMap = this.entityMap.get(key);
    if (!featureMap) {
      featureMap = new Map();
      this.entityMap.set(key, featureMap);
    }
    let idMap = featureMap.get(id);
    if (!idMap) {
      idMap = new Map();
      featureMap.set(id, idMap);
    }
    let fieldMap = idMap.get(field);
    if (!fieldMap) {
      fieldMap = new Map();
      idMap.set(field, fieldMap);
    }
    fieldMap.set(field, value);
  }

  remove(feature: string, entity: string, id: string): void {
    const key = `${feature}-${entity}`;
    const featureMap = this.entityMap.get(key);
    if (!featureMap) {
      return;
    }
    // delete the id
    featureMap.delete(id);
    // if there is nothing left in featureMap remove it from the entityMap
    if (featureMap.size === 0) {
      this.entityMap.delete(key);
    }
  }
}

export const virtualArrayMap = new VirtualArrayMap();
