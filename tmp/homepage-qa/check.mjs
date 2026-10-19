import { chromium } from 'file:///C:/Users/kuteo/AppData/Local/npm-cache/_npx/420ff84f11983ee5/node_modules/playwright/index.mjs';
const browser = await chromium.launch({headless:true});
for (const [name,width,height] of [['desktop',1440,1000],['mobile',390,844]]) {
 const page = await browser.newPage({viewport:{width,height}});
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.goto('http://127.0.0.1:5174/',{waitUntil:'networkidle'});
 await page.emulateMedia({reducedMotion:'reduce'});
 for(let y=0;y<await page.evaluate(()=>document.body.scrollHeight);y+=600){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(160);}
 await page.waitForTimeout(1000);
 const details=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,sections:[...document.querySelectorAll('section[id]')].map(s=>s.id),brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
 console.log(name,JSON.stringify({errors,...details}));
 for(const id of ['featured-properties','property-management','our-experience']){
  await page.locator('#'+id).scrollIntoViewIfNeeded();await page.waitForTimeout(400);
  await page.locator('#'+id).screenshot({path:`tmp/homepage-qa/${name}-${id}.png`});
 }
 await page.getByRole('button',{name:'Speak to an advisor',exact:true}).last().click();
 await page.waitForTimeout(800);
 console.log(name,'contactVisible',await page.getByRole('heading',{name:'CONTACT',exact:true}).isVisible());
 await page.close();
}
await browser.close();
