import { assert } from '../common/assert.function';
import { castTo } from '../common/cast-to.function';
import { psi } from '../common/theta.const';
import { ChildDefinition } from '../types/child-definition.interface';
import { SmartNgRXRowBase } from '../types/smart-ngrx-row-base.interface';

interface ChildField {
  childField: string;
}
type GenericChildDefinition = ChildField &
  Omit<ChildDefinition<object>, 'childField'>;

class ChildDefinitionRegistry {
  private childDefinitionMap = new Map<string, GenericChildDefinition[]>();

  /**
   * Register a child definition so we can get at it later
   *
   * @param feature the feature the definition is for
   * @param entity the entity the definition is for
   * @param childDefinition the childDefinition to register
   */
  registerChildDefinition<P, T extends SmartNgRXRowBase>(
    feature: string,
    entity: string,
    childDefinition: ChildDefinition<P, string, string, string, string, T>,
  ): void {
    const existingEntries =
      this.childDefinitionMap.get(`${feature}${psi}${entity}`) ?? [];
    this.childDefinitionMap.set(
      `${feature}${psi}${entity}`,
      // Something in this registration code has
      // to be castTo() it might as well be this
      castTo<GenericChildDefinition[]>([...existingEntries, childDefinition]),
    );
  }

  /**
   * Retrieve the previously registered child definition
   *
   * @param feature the feature the definition is for
   * @param entity the entity the definition is for
   * @returns the previously registered child definition
   */
  getChildDefinition<P>(feature: string, entity: string): ChildDefinition<P>[] {
    const childDefinition = this.childDefinitionMap.get(
      `${feature}${psi}${entity}`,
    );
    assert(
      !!childDefinition,
      `Child definition not found for feature: ${feature} and entity: ${entity}`,
    );
    return childDefinition;
  }
}

export const childDefinitionRegistry = new ChildDefinitionRegistry();
