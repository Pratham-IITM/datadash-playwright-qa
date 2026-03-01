const { chromium } = require('playwright');

(async () => {

  const browser = await chromium.launch();
  const page = await browser.newPage();

  const seeds = [75,76,77,78,79,80,81,82,83,84];
  let grandTotal = 0;

  for (const seed of seeds) {

    const url = `PUT_BASE_URL_HERE${seed}`;
    await page.goto(url);

    const numbers = await page.$$eval("table td", tds =>
      tds
        .map(td => parseFloat(td.innerText))
        .filter(n => !isNaN(n))
    );

    const sum = numbers.reduce((a,b)=>a+b,0);
    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();

})();
