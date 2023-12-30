function url() {
  // start by going to the tree
  return 'http://localhost:4200/tree';
}

async function action(page) {
  // our action makes sure leaving and going back to the tree
  // does not increase the memory usage
  await page.click('a[href="/home"]');
  await page.click('h1>a[href="/tree"]');
}

async function back(page) {
  // finally, going back to /home should leave us
  // in a state we can compare to the baseline
  await page.click('a[href="/home"]');
}

module.exports = {
  action,
  back,
  url,
};
