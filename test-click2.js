const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  console.log('Navigated to home');
  const body = await page.innerText('body');
  console.log(body);
  await browser.close();
})();
