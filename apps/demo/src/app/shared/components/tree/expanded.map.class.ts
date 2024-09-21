

class ExpandedMap {
  private parentLevelMap = new Map<string, Map<string, boolean>>();


  set(parentId: string, level: number, id: string, value: boolean): void {
    const key = `${parentId}:${level}`;
    const map = this.parentLevelMap.get(key) ?? new Map<string, boolean>();
    map.set(id, value);
    this.parentLevelMap.set(key, map);
  }

  get(parentId: string, level: number, id: string): boolean  {
    const key = `${parentId}:${level}`;
    const map = this.parentLevelMap.get(key);
    if (!map) {
      return false;
    }
    return Boolean(map.get(id));
  }

  delete(parentId: string, level: number, id: string): void {
    const key = `${parentId}:${level}`;
    const map = this.parentLevelMap.get(key);
    if (!map) {
      return;
    }
    map.delete(id);
  }
}

export const expandedMap = new ExpandedMap();
