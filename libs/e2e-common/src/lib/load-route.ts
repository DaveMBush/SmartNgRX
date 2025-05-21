import { Page } from '@playwright/test';

export async function loadRoute(page: Page, route: string): Promise<void> {
  await page.goto(route);
  await page.waitForSelector('select');
}
