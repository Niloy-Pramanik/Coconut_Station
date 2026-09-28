import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:3000';
const OUT_DIR = path.join(process.cwd(), 'reports', 'local', 'baseline');
const URLS = [
  { name: 'home', path: '/' },
  { name: 'menu', path: '/menu' },
  { name: 'live-coconut', path: '/menu/live-coconut' },
  { name: 'outlets', path: '/outlets' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' }
];

async function capture() {
  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  // Start the server
  const server = spawn('npm', ['start'], { stdio: 'inherit' });
  
  // Wait for server to be ready
  await new Promise(resolve => setTimeout(resolve, 5000)); // give it time to start
  
  const browser = await chromium.launch();
  const contextDesktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const contextMobile = await browser.newContext({ viewport: { width: 390, height: 844 } });
  
  for (const pageInfo of URLS) {
    const desktopPage = await contextDesktop.newPage();
    try {
      await desktopPage.goto(`${BASE_URL}${pageInfo.path}`, { waitUntil: 'networkidle', timeout: 10000 });
      await desktopPage.screenshot({ path: path.join(OUT_DIR, `${pageInfo.name}-desktop.png`), fullPage: true });
    } catch (e) {
      console.error(`Failed on ${pageInfo.name} desktop`, e);
    }
    await desktopPage.close();
    
    const mobilePage = await contextMobile.newPage();
    try {
      await mobilePage.goto(`${BASE_URL}${pageInfo.path}`, { waitUntil: 'networkidle', timeout: 10000 });
      await mobilePage.screenshot({ path: path.join(OUT_DIR, `${pageInfo.name}-mobile.png`), fullPage: true });
    } catch (e) {
      console.error(`Failed on ${pageInfo.name} mobile`, e);
    }
    await mobilePage.close();
    
    console.log(`Captured ${pageInfo.name}`);
  }
  
  await browser.close();
  server.kill();
  console.log('Screenshots complete.');
  process.exit(0);
}

capture();
