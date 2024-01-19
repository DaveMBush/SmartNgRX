import { IScenario, Page } from '@memlab/core';

function url(): string {
  // start by going to the tree
  return 'http://localhost:4200/tree';
}

async function action(page: Page) {
  // our action makes sure leaving and going back to the tree
  // does not increase the memory usage
  await page.click('a[href="/home"]');
  await page.click('a[href="/tree"]');
}

async function back(page: Page) {
  // finally, going back to /home should leave us
  // in a state we can compare to the baseline
  await page.click('a[href="/home"]');
}

export const scenario = {
  action,
  back,
  url,
} as IScenario;
