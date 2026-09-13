import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
const errors=[];
page.on('pageerror', e=>errors.push(e.message));
await page.goto('http://127.0.0.1:3101');
await page.waitForTimeout(1200);
for(let i=0;i<3;i++) {
  await page.evaluate(()=>scrollTo({top:1800,behavior:'instant'}));
  await page.waitForTimeout(100);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.waitForTimeout(100);
}
console.log('hero',await page.locator('.hero h1 > span').evaluateAll(nodes=>nodes.map(n=>({text:n.textContent,opacity:getComputedStyle(n).opacity,transform:getComputedStyle(n).transform,rect:n.getBoundingClientRect().toJSON()}))));
console.log('overflow',await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth})));
await page.screenshot({path:'/workspace/scratch/f428abb9ba33/mobile-v8-preview.png',fullPage:false});
for(const slug of ['squadtactics','helpdesk','spoton','qnb','swizzle']) {
  await page.goto('http://127.0.0.1:3101/work/'+slug);
  console.log(slug,await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth})));
}
console.log('errors',errors);
await browser.close();
