const puppeteer = require('puppeteer');

const puppeteerFunction = async (hot, cold) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    await page.goto('https://majavalitseja.ee/esita-naidud');
    await page.type('#aadress', 'Asunduse 15');
    await page.type('#korter', '68');
    await page.type('#nimi', 'Keijo Prunt');
    await page.type('#email', 'pruntk@gmail.com');
    await page.type('#soevesikook', '-');
    await page.type('#kulmvesikook', '-');
    await page.type('#soevesivann', '-');
    await page.type('#uldsoevesi', hot);
    await page.type('#uldkulmvesi', cold);
    await page.type('#elekter', '-');
    await page.type('#gaas', '-');
    // await page.click('input.button')
    // await page.waitForTimeout(3000) // Wait for 3 seconds
    // await browser.close() // Make sure to close the browser window. Or you will create additional background processes
    // Some success check!!!!!!!!!
    console.log('puppeteerFunction success');
  } catch (error) {
    console.log('puppeteerFunction error: ', error);
  }
};

module.exports = puppeteerFunction;
