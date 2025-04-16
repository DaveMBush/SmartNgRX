import { isNullOrUndefined } from '../common/is-null-or-undefined.function';
import { psi } from '../common/psi.const';

class MarkAndDeleteEntities {
  private markAndDelete: Record<string, Map<string, number>> = {};

  /**
   * clears the mark and delete map
   * used for testing
   */
  clear() {
    this.markAndDelete = {};
  }

  /**
   * retrieves the mark and delete map for the feature
   *
   * @param feature the feature to retrieve
   * @param entity the entity within the feature to retrieve
   * @returns the Map of record keys to the last time they were marked dirty
   */
  map(feature: string, entity: string): Map<string, number> {
    const key = `${feature}${psi}${entity}`;
    if (isNullOrUndefined(this.markAndDelete[key])) {
      this.markAndDelete[key] = new Map<string, number>();
    }
    return this.markAndDelete[key];
  }

  /**
   * returns the entities that have been registered with markAndDelete
   *
   * @returns the entities that have been registered with markAndDelete
   */
  entities(): string[] {
    return Object.keys(this.markAndDelete);
  }
}

export const markAndDeleteEntities = new MarkAndDeleteEntities();
