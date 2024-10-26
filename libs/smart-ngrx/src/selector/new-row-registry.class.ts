import { psi } from '../common/psi.const';

class NewRowRegistry {
  private newRows: Set<string> = new Set();
  registerNewRow(feature: string, entity: string, id: string): void {
    this.newRows.add(`${feature}${psi}${entity}${psi}${id}`);
  }

  isNewRow(feature: string, entity: string, id: string): boolean {
    return this.newRows.has(`${feature}${psi}${entity}${psi}${id}`);
  }

  remove(feature: string, entity: string, id: string): void {
    this.newRows.delete(`${feature}${psi}${entity}${psi}${id}`);
  }
}

export const newRowRegistry = new NewRowRegistry();
