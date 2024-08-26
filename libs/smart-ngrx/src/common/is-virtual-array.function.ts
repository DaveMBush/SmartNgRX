import { VirtualArrayContents } from '../types/virtual-array-contents.interface';

/**
 * Type guard to check if an item is a VirtualArrayContents
 *
 * @param item The item to check
 * @returns True if the item is a VirtualArrayContents, false otherwise
 */
export function isVirtualArray(item: unknown): item is VirtualArrayContents {
  return (
    typeof item === 'object' &&
    item !== null &&
    'indexes' in item &&
    Array.isArray((item as VirtualArrayContents).indexes)
  );
}
