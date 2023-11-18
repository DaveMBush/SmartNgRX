function url() {
  // start by going to the tree
  return 'http://localhost:4200/tree';
}

async function action(page) {
  // our action makes sure leaving and going back to the tree
  // does not increase the memory usage
  await page.click('a[href="/memlab"] span.mdc-tab__text-label');
  await page.click('a[href="/tree"] span.mdc-tab__text-label');
}

async function back(page) {
  // finally, going back to /memlab should leave us
  // in a state we can compare to the baseline
  await page.click('a[href="/memlab"] span.mdc-tab__text-label');
}

module.exports = {
  action,
  back,
  url,
};
