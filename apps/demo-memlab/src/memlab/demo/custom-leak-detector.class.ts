import { IHeapNode, IHeapSnapshot } from '@memlab/core';
import * as memlab from 'memlab';

export class CustomLeakDetector
  extends memlab.DefaultLeakDetector
  implements LeakDetector
{
  constructor() {
    super();
  }

  leakFilter(
    node: IHeapNode,
    snapshot: IHeapSnapshot,
    leakedNodeIds: Set<number>,
  ) {
    return true;
  }
}
