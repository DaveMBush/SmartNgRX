import { Page } from '@playwright/test';

import { getStoreState } from './get-store-state';

export async function getStoreFeature(
  page: Page,
  selector: string,
): Promise<Record<string, unknown>> {
  const state = await getStoreState(page);
  return state[selector] as Record<string, unknown>;
}
