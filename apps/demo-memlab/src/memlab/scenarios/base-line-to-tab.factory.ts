import { IScenario, Page } from '@memlab/core';

export function baseLineToTab(
  tab: string,
  name: string,
): IScenario & { name: string } {
  function url(): string {
    // start by going to the tree
    return `http://localhost:4200/${tab}`;
  }

  async function common(page: Page): Promise<void> {
    await page.click('a[href="/home"]');
    await new Promise((r) => setTimeout(r, 2000));
    const tree = await page.waitForSelector(`a[href="/${tab}"]`);
    // clicking tree right away doesn't do anything... probably because of animation
    await new Promise((r) => setTimeout(r, 2000));
    if (tree) {
      await tree?.click();
    }
    await new Promise((r) => setTimeout(r, 2000));
  }

  async function setup(page: Page): Promise<void> {
    // our action makes sure leaving and going back to the tree
    // does not increase the memory usage
    for (let i = 0; i < 0; i++) {
      await common(page);
    }
  }

  async function action(page: Page): Promise<void> {
    // our action makes sure leaving and going back to the tree
    // does not increase the memory usage
    await common(page);
  }

  async function back(page: Page): Promise<void> {
    // finally, going back to /home should leave us
    // in a state we can compare to the baseline
    await page.click('a[href="/home"]');
    await new Promise((r) => setTimeout(r, 2000));
  }

  return {
    setup,
    action,
    back,
    url,
    name,
  } as IScenario & { name: string };
}
