/* eslint-disable require-atomic-updates */
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import { performance } from 'perf_hooks';
import * as _ from 'lodash';

const pagesToView = [
  {
    name: 'google',
    url: 'https://time.is/',
    width: 640,
    height: 480,
    refreshInterval: 1000,
    lastRefresh: 0
  },
  {
    name: 'bing',
    url: 'https://time.is/',
    width: 640,
    height: 480,
    refreshInterval: 5000,
    lastRefresh: 0
  }
];

async function getScreenshotOfPage(pageDetails) {
  console.log('getScreenshotOfPage');
  if (pageDetails.browser === undefined) {
    pageDetails.browser = await puppeteer.launch({
      args: [`--window-size=${pageDetails.width},${pageDetails.height}`],
      defaultViewport: {
        width: pageDetails.width,
        height: pageDetails.height,
        isMobile: true
      }
    });
  }

  const page = await pageDetails.browser.newPage();

  console.log('ok we are making browser');
  await page.goto(pageDetails.url);

  await page.screenshot({
    path: path.join(
      __dirname,
      '../../../',
      'assets',
      `${pageDetails.filename}.jpg`
    )
  });

  //   await pageDetails.browser.close();
}

export async function handleScreenshots() {
  console.log('handleScreenshots called');
  const now = performance.now();

  const sortedPages = _.sortBy(pagesToView, 'lastRefresh');
  for (const page of sortedPages) {
    console.log(page.name);
    console.log(now - page.lastRefresh);
    if (now - page.lastRefresh > page.refreshInterval) {
      console.log('before');
      await getScreenshotOfPage(page);
      console.log('after');
      page.lastRefresh = now;
      console.log(pagesToView);
      return;
    }
  }
}
