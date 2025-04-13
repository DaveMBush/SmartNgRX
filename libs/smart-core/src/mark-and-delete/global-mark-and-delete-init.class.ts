import { MarkAndDeleteInit } from '../types/mark-and-delete-init.interface';

class GlobalMarkAndDeleteInit {
  globalMarkAndDelete = {} as Partial<MarkAndDeleteInit>;
  /**
   * Function that allows us to register the global `markAndDeleteInit`
   * globally so we can retrieve it when we need it.
   *
   * @param markAndDelete the mark and delete init for the entity
   */
  register(markAndDelete: MarkAndDeleteInit): void {
    this.globalMarkAndDelete = markAndDelete;
  }

  /**
   * retrieves previously registered global `MarkAndDeleteInit`
   *
   * @returns the `MarkAndDeleteInit` for the entity
   */
  get(): Partial<MarkAndDeleteInit> {
    return this.globalMarkAndDelete;
  }
}

export const globalMarkAndDeleteInit = new GlobalMarkAndDeleteInit();
