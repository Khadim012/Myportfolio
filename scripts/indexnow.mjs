// Tells IndexNow search engines (Bing, Yandex, Seznam, Naver…) that the site's
// pages changed, so they recrawl without waiting. Google does not use IndexNow;
// for Google, submit the sitemap in Search Console.
// Run after a deploy has finished: npm run indexnow
// The key below is public by design; it must match public/<key>.txt on the live site.
const KEY = "0a73a488af58d18f849adf8acbaac51b";
const HOST = "khadimhussain.com";
const origin = `https://${HOST}`;

const xml = await (await fetch(`${origin}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error("No URLs found in the live sitemap");

const keyCheck = await fetch(`${origin}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) throw new Error("Key file is not live yet; deploy first");

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${origin}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (res.status >= 400) process.exit(1);
