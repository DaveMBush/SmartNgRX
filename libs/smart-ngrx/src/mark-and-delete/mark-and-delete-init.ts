import { MarkAndDeleteInit } from '../types/mark-and-delete-init.interface';

let globalMarkAndDelete = {} as Partial<MarkAndDeleteInit>;

/**
 * Function that allows us to register the global `markAndDeleteInit`
 * globally so we can retrieve it when we need it.
 *
 * @param markAndDelete the mark and delete init for the entity
 */
export function registerGlobalMarkAndDeleteInit(
  markAndDelete: MarkAndDeleteInit,
): void {
  globalMarkAndDelete = markAndDelete;
}

/**
 * retrieves previously registered global `MarkAndDeleteInit`
 *
 * @returns the `MarkAndDeleteInit` for the entity
 */
export function getGlobalMarkAndDeleteInit(): Partial<MarkAndDeleteInit> {
  return globalMarkAndDelete;
}
