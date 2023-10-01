const puppeteer = require('puppeteer');

const puppeteerFunction = async (hot, cold) => {
  try {
    const browser = await puppeteer.launch({
      headless: true, // set false for local development
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
    await page.click('input.button');
    await page.waitForNavigation({ url: 'https://majavalitseja.ee/taname-paringu-eest' });
    const pageContent = await page.content();
    const dateTime = new Date().toLocaleString('fi-FI');
    if (pageContent.includes('Täname Teid päringu eest!')) {
      console.log('Form submitted', 'hot: ', hot, 'cold: ', cold, 'date:', dateTime);
    } else {
      throw new Error('Form submit not verified!', 'hot: ', hot, 'cold: ', cold, 'date: ', dateTime);
    }
    await browser.close(); // Make sure to close the browser window. Or you will create additional background processes
  } catch (error) {
    console.log('puppeteerFunction error: ', error);
  }
};

module.exports = puppeteerFunction;
