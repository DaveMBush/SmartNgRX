import { IScenario } from '@memlab/core';

import { LeakItem } from './leak-item.interface';

export interface LeakErrors {
  scenario: IScenario;
  leakCount: number;
  leaks: LeakItem[];
}
