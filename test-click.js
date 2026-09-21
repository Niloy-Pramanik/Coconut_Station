const { chromium } = require('@playwright/test');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  console.log('Navigated to home');
  
  const link = page.locator('text=Live Young Coconut');
  await link.click();
  console.log('Clicked link');
  
  await page.waitForTimeout(3000);
  console.log('Current URL:', page.url());
  const body = await page.innerText('body');
  console.log('Body text excerpt:', body.substring(0, 200));
  
  await browser.close();
})();
