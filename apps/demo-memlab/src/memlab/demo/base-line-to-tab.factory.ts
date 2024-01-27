import { IScenario, Page } from '@memlab/core';

export function baseLineToTab(tab: string): IScenario {
  function url(): string {
    // start by going to the tree
    return `http://localhost:4200/${tab}`;
  }

  async function action(page: Page) {
    // our action makes sure leaving and going back to the tree
    // does not increase the memory usage
    await page.click('a[href="/home"]');
    await new Promise((r) => setTimeout(r, 2000));
    let tree = await page.waitForSelector(`a[href="/${tab}"]`);
    // clicking tree right away doesn't do anything... probably because of animation
    await new Promise((r) => setTimeout(r, 2000));
    if (tree) {
      await tree?.click();
    }
    await new Promise((r) => setTimeout(r, 2000));
  }

  async function back(page: Page) {
    // finally, going back to /home should leave us
    // in a state we can compare to the baseline
    await page.click('a[href="/home"]');
    await new Promise((r) => setTimeout(r, 2000));
  }

  return {
    //externalLeakFilter,
    action,
    back,
    url,
  } as IScenario;
}
