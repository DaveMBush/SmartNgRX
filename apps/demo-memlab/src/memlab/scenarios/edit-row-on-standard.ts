import { IScenario, Page } from '@memlab/core';

function url(): string {
  // start by going to the tree
  return 'http://localhost:4200/tree#edit';
}

async function common(page: Page) {
  await page.click('a[href="/home"]');
  await new Promise((r) => setTimeout(r, 2000));
  let tree = await page.waitForSelector('a[href="/tree"]');
  await new Promise((r) => setTimeout(r, 2000));
  if (tree) {
    await tree?.click();
  }
  const hover = await page.waitForSelector(
    'mat-tree mat-tree-node:nth-child(1).mat-tree-node',
  );
  if (hover) {
    await hover.hover();
  }
  await new Promise((r) => setTimeout(r, 2000));
}

async function action(page: Page) {
  // our action makes sure editing a node
  // does not increase the memory usage
  await common(page);
  let hover = await page.waitForSelector(
    'mat-tree mat-tree-node:nth-child(1).mat-tree-node',
  );
  let button = await hover?.waitForSelector('button:nth-child(3)');
  if (button) {
    await button.click();
  }
  let edit = await page.waitForSelector('input[placeholder="Name"]');
  if (edit) {
    await edit.type('test' + String.fromCharCode(13));
  }
  await new Promise((r) => setTimeout(r, 2000));
  hover = await page.waitForSelector(
    'mat-tree mat-tree-node:nth-child(1).mat-tree-node',
  );
  button = await hover?.waitForSelector('button:nth-child(3)');
  if (button) {
    await button.click();
  }
  edit = await page.waitForSelector('input[placeholder="Name"]');
  if (edit) {
    await edit.type('');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await edit.type(String.fromCharCode(13));
  }

  await page.mouse.move(0, 0);
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
  name: 'editRowOnStandard',
} as IScenario & { name: string };
