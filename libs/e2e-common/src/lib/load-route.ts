import { Page } from '@playwright/test';

/**
 * Loads a route in the Playwright page.
 *
 * @param page The Playwright page object.
 * @param route The route to load.
 */
export async function loadRoute(page: Page, route: string): Promise<void> {
  await page.goto(route);
  await page.waitForSelector('select');
}
